import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/User';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Token } from './auth/entities/Token';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/Post';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/entities/Like';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/Comment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ola__987',
      database: 'network_db',
      entities: [User, Token, Post, Like, Comment],
      synchronize: true
    }),
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
