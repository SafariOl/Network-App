import { Controller, Patch, Param, ParseIntPipe, Get } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  findAll() {
    return this.likesService.findAll()
  }

  @Patch(":userId/:postId")
  likePost(@Param('userId', ParseIntPipe) userId: number, @Param('postId', ParseIntPipe) postId: number) {
    return this.likesService.likePost(userId, postId)
  }
}
