import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./Token";

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

    @Column({ default: false })
    is_activated: boolean;

    @OneToOne(() => Token, token => token.user, {cascade: true})
    token: Token
}