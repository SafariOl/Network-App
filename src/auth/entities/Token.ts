import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'tokens'})
export class Token {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    refreshToken: string;

    @OneToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User
}