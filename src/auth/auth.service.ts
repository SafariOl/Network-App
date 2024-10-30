import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Repository } from 'typeorm';
import { Token } from 'src/auth/entities/Token';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        @InjectRepository(Token) 
        private readonly tokenRepository: Repository<Token>,
        private jwtService: JwtService
    ) {}

    async register(registerDetails: RegisterDto) {
        const user = await this.userRepository.findOneBy({ email: registerDetails.email });
        if (user) {
            throw new HttpException('User already exists', 404);
        }

        const hashPassword = await bcrypt.hash(registerDetails.password, 3);
        const newUser = this.userRepository.create({ ...registerDetails, password: hashPassword });
        await this.userRepository.save(newUser);

        const payload = { sub: newUser.id, username: newUser.username, email: newUser.email };
        const tokens = await this.generateTokens(payload);
        await this.saveToken(newUser.id, tokens.refreshToken);

        return {
            ...tokens,
            user: { ...newUser },
        };
    }

    async login({ email, password }: LoginDto) {
        const user = await this.userRepository.findOneBy({ email });
    
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { sub: user.id, username: user.username, email: user.email };
        const tokens = await this.generateTokens(payload);
        await this.saveToken(user.id, tokens.refreshToken);
    
        return {
            ...tokens,
            user: { ...user },
        };
    }

    async refresh(refreshToken: string) {
        const token = await this.tokenRepository.findOne({
            where: { refreshToken },
            relations: ['user'] 
        });

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const verifiedToken = await this.jwtService.verify(token.refreshToken);
        } catch (error) {
            throw new UnauthorizedException('Token is invalid or expired');
        }

        const user = token.user;
        const payload = { sub: user.id, username: user.username, email: user.email };
        const tokens = await this.generateTokens(payload);
        await this.saveToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: { ...user },
        };
    }

    async saveToken(userId: number, refreshToken: string) {
        let token = await this.tokenRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user'],
        });

        if (token) {
            token.refreshToken = refreshToken;
        } else {
            token = this.tokenRepository.create({ 
                user: { id: userId } as User, 
                refreshToken
            });
        }

        return await this.tokenRepository.save(token);
    }

    async generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '3d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    async logout(refreshToken: string) {
        const token = await this.tokenRepository.findOneBy({ refreshToken });
        if (token) {
            await this.tokenRepository.delete(token.id);
        }
        return { message: 'Successfully logged out' };
    }
}
