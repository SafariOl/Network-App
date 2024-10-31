import { User } from "src/auth/entities/User";
import { Comment } from "src/comments/entities/Comment";
import { Like } from "src/likes/entities/Like";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 300, nullable: true})
    description: string;

    @Column({default: 0})
    likes: number;

    @Column()
    image: string;

    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE'})
    user: User

    @OneToMany(() => Like, like => like.post)
    like: Like

    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]
}