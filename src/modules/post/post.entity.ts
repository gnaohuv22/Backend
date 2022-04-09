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

    @Column({type: 'varchar', nullable: true})
    createdAt: string;

    @Column('text')
    image: Array<string>;
    
    @Column('int')
    adminId: number;

    @Column('varchar')
    category: string;

    @Column('boolean')
    onTheSlide: boolean;

    @ManyToOne(() => AdminEntity, admin => admin.id)
    admin: AdminEntity;

    @OneToMany(() => CommentEntity, comments => comments.postId)
    comments: CommentEntity[];
}