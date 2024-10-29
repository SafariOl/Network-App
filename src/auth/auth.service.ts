import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import *  as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async register (registerDetails: RegisterDto) {
        const user = await this.userRepository.findOneBy({email: registerDetails.email})
        if (user) {
            throw new HttpException('User has already exist', 404)
        }
        const hashPassword = await bcrypt.hash(registerDetails.password, 3)
        const newUser = this.userRepository.create({...registerDetails, password: hashPassword})
        await this.userRepository.save(newUser)
        const payload = {sub: newUser.id, username: newUser.username, email: newUser.email}
        return {
            ...newUser,
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async login({email, pass} : LoginDto) {
        const user = await this.userRepository.findOneBy({email});

        if (!user && !(await bcrypt.compare(pass, user.password))) {
          throw new UnauthorizedException()
        }
        const payload = { sub: user.id, username: user.username, email: user.email};
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };
      }

    async logout (refreshToken: string) {

    }
}
