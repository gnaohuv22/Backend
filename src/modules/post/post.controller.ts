import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PostDto } from './dto/createPost.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('news')
export class PostController {
    constructor(private readonly PostsService: PostService) {}

    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string' } } })
    @Get('/posts')
    async getListPost(): Promise<PostEntity[]> {
        
        return await this.PostsService.getListPost();
    }

    @ApiOkResponse({ schema: { example: {id: 'number', title: 'string', content: 'string', createdAt: 'string', image: 'string', adminId: 'number', category: 'string' } } })
    @Get('')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ): Promise<Pagination<PostEntity>> {
        
        return this.PostsService.paginate({
            page,
            limit,
        });
    }

    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string' } } })
    @Get('/recent')
    async getNewestPosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getNewestPosts();
    }

    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string' } } })
    @Delete('/delete/:postId')
    async deletePost(@Param('postId') postId: number): Promise<PostDto> {

        return this.PostsService.removePost(postId);
    }
}

