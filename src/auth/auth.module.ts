import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Token } from 'src/auth/entities/Token';
import { Post } from 'src/posts/entities/Post';
import { Like } from 'src/likes/entities/Like';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token, Post, Like]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
