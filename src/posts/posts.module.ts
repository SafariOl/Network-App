import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/Post';
import { User } from 'src/auth/entities/User';
import { Comment } from 'src/comments/entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
