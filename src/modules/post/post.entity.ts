import { AdminEntity } from '../admin/admin.entity';
import { CommentEntity } from '../comment/comment.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    title: string;

    @Column('text')
    content: string;

    @Column({type: 'int', nullable: true})
    createdAt: string;

    @Column('varchar')
    image: string;
    
    @Column('int')
    adminId: number;

    @Column('varchar')
    category: string;

    @ManyToOne(() => AdminEntity, admin => admin.id)
    admin: AdminEntity;

    @OneToMany(() => CommentEntity, comments => comments.postId)
    comments: CommentEntity[];
}