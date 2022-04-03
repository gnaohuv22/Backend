import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity) private commentRepo: Repository<CommentEntity>
    ) {}

    async getComment() {
        return await this.commentRepo.find();
    }
}
