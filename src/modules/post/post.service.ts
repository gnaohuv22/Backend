import { createPostDto } from './dto/createPost.dto';
import { HttpException, Injectable, InternalServerErrorException, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { 
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { UpdatePostDto } from './dto/updatePost.dto';

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

    async getFourNextNewestPosts(): Promise<PostEntity[]> {
        
        try {
            const result = await this.PostRepo.find({
                take: 4, // this number affect the number of posts which appear in the homepage.
                skip: 6,
                order: {
                    id: "DESC", // descending order.
                },
            })
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getSixNewestPosts(): Promise<PostEntity[]> {
        
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

    async getPostOnTheSlide(): Promise<PostEntity[]> {
        try {
            const result = await this.PostRepo.find({
                where: { 
                    onTheSlide: true,
                }
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
            return '';
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async createPost(post: createPostDto): Promise<any> {
        try {
            const postEntity = new PostEntity;
            postEntity.title = post.title;
            postEntity.content = post.content;
            postEntity.adminId = post.adminId;
            postEntity.image = post.image;
            postEntity.category = post.category;
            postEntity.onTheSlide = false;

            const result = await this.PostRepo.save(postEntity);
            return result;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getAPost(id: number): Promise<any> {
        const result = await this.PostRepo.findOne(id);
        if (id > await this.getMaxId()) {
            throw new NotFoundException(`Post have id-${id} does not exist`);
        }
        try {
            return result;
        } catch (error) {
            // console.log(error);
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getMaxId(): Promise<number> {
        const result = await this.PostRepo.find({
            take: 1,
            order: { 
                id: 'DESC',
            }
        })
        return result[0].id;
    }
    
    async updatePost(post: UpdatePostDto) {
        
        const postEntity = new PostEntity;
        postEntity.id = post.id;
        postEntity.title = post.title;
        postEntity.content = post.content;
        postEntity.adminId = post.adminId;
        postEntity.image = post.image;
        postEntity.category = post.category;
        postEntity.onTheSlide = post.onTheSlide;

        if (post.id > await this.getMaxId()) {
            throw new NotFoundException(`Post have id-${post.id} does not exist`);
        }
        else {
            try {
                const result = await this.PostRepo.save(postEntity);
                return result;
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException('Internal Server Error')
            }
        }
    }
}   
