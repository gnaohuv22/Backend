import { createCommentDto } from './dto/createComment.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>
    ) {}

    async getComment() {
        
        try {
            const result = await this.commentRepo.find();
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async addComment(comment: createCommentDto): Promise<any> {

        try {
            const commentEntity = new CommentEntity;
            commentEntity.content = comment.content;
            commentEntity.name = comment.name;
            commentEntity.createdAt = comment.createdAt;
            commentEntity.postId = comment.postId;
            commentEntity.replyCommentId = comment.replyCommentId;

            const result = await this.commentRepo.save(commentEntity);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async findComment(id: number): Promise<CommentEntity> {
        try {
            const result = await this.commentRepo.findOne(id);
            return result;
        } catch (error) {
            throw new NotFoundException(`Comment ID-${id} does not exist`);
        }
    }
    async editComment(comment: UpdateCommentDto) {
        try {
            const commentEntity = await this.findComment(comment.id);
            commentEntity.name = comment.name;
            commentEntity.content = comment.content;
            
            const result = await this.commentRepo.save(commentEntity);
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
