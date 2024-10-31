import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  findPostComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.findPostComments(postId)
  }

  @Post(':userId/:postId')
  addComment(
    @Param('userId', ParseIntPipe) userId:number, 
    @Param('postId', ParseIntPipe) postId: number, 
    @Body() commentDetails: CommentDto
  ) {
    return this.commentsService.addComment(userId, postId, commentDetails)
  }

  @Patch(':commentId')
  editComment(@Param('commentId', ParseIntPipe) commentId:number,  @Body() commentDetails: CommentDto) {
    return this.commentsService.editComment(commentId, commentDetails)
  }

  @Delete(':commentId')
  removeComment(@Param('commentId', ParseIntPipe) commentId:number) {
    return this.commentsService.removeComment(commentId)
  }
}
