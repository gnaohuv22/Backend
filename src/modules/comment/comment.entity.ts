import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class CommentEntity{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    content: string;

    @Column('varchar')
    name: string;

    @Column('date')
    createdAt: Date;

    @Column('int')
    postId: number;

    @Column('int')
    replyCommentId: number;

    @ManyToOne(() => PostEntity, post => post.id)
    post: PostEntity;
}