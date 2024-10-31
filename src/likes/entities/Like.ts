import { User } from "src/auth/entities/User";
import { Post } from "src/posts/entities/Post";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'likes'})
export class Like {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Post, post => post.likes, {onDelete: 'CASCADE'})
    post: Post

    @ManyToOne(() => User, user => user.likes, {onDelete: 'CASCADE'})
    user: User
}
