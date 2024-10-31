import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(){
    return this.postsService.getPosts()
  }

  @Get(":postId")
  findPost(@Param('postId', ParseIntPipe) postId: number) {
    return this.postsService.findPost(postId)
  }

  @Post(':userId')
  createPost(@Param('userId', ParseIntPipe) userId:number, @Body() postDto: CreatePostDto) {
    return this.postsService.createPost(userId, postDto)
  }

  @Patch(':postId')
  updatePost(@Param('postId', ParseIntPipe) postId: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(postId, updatePostDto)
  }

  @Delete(':postId')
  deletePost(@Param('postId', ParseIntPipe) postId:number) {
    return this.postsService.deletePost(postId)
  }
}
