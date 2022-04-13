import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../post/post.entity";

@Entity()
export class AdminEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    email: string;

    @Column({type: 'varchar', nullable: false})
    password: string;
}