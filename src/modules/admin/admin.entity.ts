import { PostEntity } from "../post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AdminEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    email: string;

    @Column('varchar')
    name: string;

    @OneToMany(() => PostEntity, post => post.adminId)
    post: PostEntity[];
}