import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Post } from 'src/posts/entities/Post';
import { Comment } from './entities/Comment';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
