import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Token } from 'src/typeorm/entities/Token';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
