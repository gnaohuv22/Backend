import { Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async paginate(options: IPaginationOptions): Promise<Pagination<PostEntity>> { //return paginating results
        
        try {
            const queryBuilder = this.PostRepo.createQueryBuilder('p');
            queryBuilder.orderBy('p.id', 'DESC')

            return paginate<PostEntity>(queryBuilder, options);

        } catch (error) {

            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getNewestPosts(): Promise<PostEntity[]> {
        
        try {
            const result = await this.PostRepo.find({
                take: 6, // this number affect the number of posts which appear in the homepage.
                order: {
                    id: "DESC", // descending order.
                },
            })
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getPost(postId: number): Promise<PostEntity> {
        try {
            const result = await this.PostRepo.findOne(postId);
            return result;

        } catch (error) {

            throw new InternalServerErrorException('Internal Server Error');
        }
    }
    async removePost(postId: number): Promise<any> {

        const post = await this.getPost(postId);
        if (post == null) {

            throw new NotFoundException(`Post have id-${postId} does not exist`);
        }
        try {
            await this.PostRepo.delete(postId);
            return { postId: postId };

        } catch (error) {
            
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
