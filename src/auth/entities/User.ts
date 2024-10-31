import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./Token";
import { Post } from "src/posts/entities/Post";
import { Like } from "src/likes/entities/Like";
import { Comment } from "src/comments/entities/Comment";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    logo: string;

    @OneToOne(() => Token, token => token.user, {cascade: true})
    token: Token

    @OneToMany(() => Post, post => post.user)
    posts: Post[]

    @OneToMany(() => Like, like => like.user)
    likes: Like[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]
}