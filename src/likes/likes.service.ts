import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/User';
import { Post } from 'src/posts/entities/Post';
import { Repository } from 'typeorm';
import { Like } from './entities/Like';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ){}

  async findAll() {
    return await this.likeRepository.find({relations: ["user", "post"]})
  }

  async likePost(userId: number, postId: number) {
    const user = await this.userRepository.findOneBy({id: userId})
    if(!user) throw new UnauthorizedException("User doesn't exist")

    const post = await this.postRepository.findOneBy({id: postId})
    if (!post) throw new BadRequestException("Post not found")

    const like = await this.likeRepository.findOne({where: {user, post}})
    if (like) {
      await this.likeRepository.delete({id: like.id})
      post.likes -= 1
      await this.postRepository.save(post)
      return {message: "Post unliked"}
    }
    
    const newLike = this.likeRepository.create({post, user})
    await this.likeRepository.save(newLike)
    post.likes += 1
    await this.postRepository.save(post)
    return {message: "Post liked"}
  }
}
