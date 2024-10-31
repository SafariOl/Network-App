import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Like } from './entities/Like';
import { Post } from 'src/posts/entities/Post';

@Module({
  imports: [TypeOrmModule.forFeature([User, Like, Post])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
