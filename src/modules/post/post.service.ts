import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { 
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PostService {

    constructor(

        @InjectRepository(PostEntity) private PostRepo: Repository<PostEntity>
    ) {}

    async getListPost(): Promise<PostEntity[]> {
        
        try {
            const result = await this.PostRepo.find();
            return result;

        } catch (error) {
            
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<PostEntity>> {
        const queryBuilder = this.PostRepo.createQueryBuilder('p');
        queryBuilder.orderBy('p.id', 'DESC')

        return paginate<PostEntity>(queryBuilder, options);
    }
}

export class NewestPostService {

    constructor(

        @InjectRepository(PostEntity) private PostRepo: Repository<PostEntity>
    ) {}
    
    async getNewestPosts(): Promise<PostEntity[]> {
        try {
            const result = await this.PostRepo.find({
                take: 6,
                order: {
                    id: "DESC",
                },
            })
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
