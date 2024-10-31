import { User } from "src/auth/entities/User";
import { Post } from "src/posts/entities/Post";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comments'})
export class Comment {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    text: string;

    @ManyToOne(() => User, user => user.comments, {onDelete: 'CASCADE'})
    user: User

    @ManyToOne(() => Post, post => post.comments, {onDelete: 'CASCADE'})
    post: Post
}