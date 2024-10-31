import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/Post';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/entities/User';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(Post)
      private readonly postRepository: Repository<Post>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>
    ){}

    async createPost(userId:number, postDetails:CreatePostDto) {
        const user = await this.userRepository.findOneBy({id: userId})
        const newPost = this.postRepository.create({user, ...postDetails})
        return await this.postRepository.save(newPost)
    }

    async getPosts() {
        return await this.postRepository.find({relations: ['user', 'comments']})
    }

    async findPost(postId:number) {
        return await this.postRepository.findOneBy({id: postId})
    }

    async updatePost(postId:number, postDetails:UpdatePostDto) {
        return await this.postRepository.update({id: postId}, {...postDetails})     
    }

    async deletePost(postId:number) {
        return await this.postRepository.delete({id: postId})
    }
}
