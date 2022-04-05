import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: 'Access token is invalid', error: 'Unauthorized' } } })
@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Access token expired', error: 'Forbidden' } } })
@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Token not found', error: 'Not found' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('news')
export class PostController {
    constructor(private readonly PostsService: PostService) {}

    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string' } } })
    @Get('all_posts')
    async getListPost(): Promise<PostEntity[]> {
        
        return await this.PostsService.getListPost();
    }

    @ApiOkResponse({ schema: { example: {message:'Paginating successfully.'}}})
    @Get('pagination')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        limit = 9,
    ): Promise<Pagination<PostEntity>> {
        
        return this.PostsService.paginate({
            page,
            limit,
        });
    }

    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string' } } })
    @Get('newest_posts')
    async getNewestPosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getNewestPosts();
    }
}

