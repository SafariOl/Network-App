import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) { 
        return this.authService.login(loginDto)
    }

    @Post('refresh')
    refresh (@Body() refreshTokenData: RefreshTokenDto) {
        return this.authService.refresh(refreshTokenData.refreshToken)
    }

    @Post('logout')
    logout() {
        return
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
