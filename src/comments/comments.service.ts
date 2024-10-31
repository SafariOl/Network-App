import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Post } from 'src/posts/entities/Post';
import { Repository } from 'typeorm';
import { Comment } from './entities/Comment';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>
    ){}


    async findPostComments (postId: number) {
        return await this.commentRepository.find({where: {post: {id: postId}}, relations: ['user']})
    }

    async addComment (userId:number, postId:number, commentDetails:CommentDto){ 
        const user = await this.userRepository.findOneBy({id: userId})
        if (!user) throw new NotFoundException("User doesn't exist")

        const post = await this.postRepository.findOneBy({id: postId})
        if(!post) throw new NotFoundException("Post not found")

        const newComment = this.commentRepository.create({text: commentDetails.text, user, post, })
        await this.commentRepository.save(newComment)
        return {message: "comment added"}
    }

    async editComment (commentId: number, commentDetails: CommentDto) {
        const comment = await this.commentRepository.findOneBy({id: commentId})
        if (!comment) throw new NotFoundException("Comment not found")
        
        comment.text = commentDetails.text
        await this.commentRepository.save(comment)
        return {message: 'comment edited'}
    }

    async removeComment (commentId: number) {
        await this.commentRepository.delete({id: commentId})
        return {message: 'comment removed'}
    }
}
