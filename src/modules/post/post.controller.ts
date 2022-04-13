import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { createPostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Not found', error: 'Not found' } } })
@ApiBadRequestResponse({ schema: { example: { statusCode: 400, message: 'Bad request', error: 'Bad request' } } })
@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Forbidden', error: 'Forbidden' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('')
export class PostController {
    constructor(private readonly PostsService: PostService) {}

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/posts/all')
    async getListPost(): Promise<PostEntity[]> {
        
        return await this.PostsService.getListPost();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/trending')
    async getSlidePost(): Promise<PostEntity[]> {

        return await this.PostsService.getPostOnTheSlide();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/pagination')
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    ): Promise<Pagination<PostEntity>> {
        limit = limit > 20 ? 20 : limit;
        const numberOfPost = await this.PostsService.getMaxId();
        const maximumPage = numberOfPost / limit;
        if (page > maximumPage) {
            throw new BadRequestException('Invalid page number');
        }
        return await this.PostsService.paginate({
            page,
            limit,
        });
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/posts/side')
    async getNewestPosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getFourNextNewestPosts();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/posts/center')
    async getSidePosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getSixNewestPosts();
    }
   
    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    @Get('/post/:postId')
    async getAPost(@Param('postId') postId: number): Promise<any> {
        
        return await this.PostsService.getAPost(postId);
    }

    @ApiOkResponse({ schema: {example: { message: 'Deleted successfully.' } } })
    @Delete('/:postId')
    async deletePost(@Param('postId') postId: number): Promise<createPostDto> {

        return await this.PostsService.removePost(postId);
    }

    @ApiOkResponse({ schema: {example: { message: 'Created successfully.' } } })
    @ApiCreatedResponse({ schema: { example: { title: 'string', content: 'string', image: 'string', onTheSlide: 'number', id: 'number' } } })
    @Post('/create')
    async createPost(@Body() post: createPostDto): Promise<any> {

        return await this.PostsService.createPost(post);
    }
 
    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string', message: 'Updated successfully.'}}})
    @Put('/edit')
    async updatePost(@Body() data: UpdatePostDto) {
        
        return await this.PostsService.updatePost(data);
    }

    @Put('/post/:postId/:status')
    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', onTheSlide: 'number'} } })
    async updatePostStatus(
        @Param('postId') postId: number,
        @Param('status') status: number) {
            return await this.PostsService.updatePostStatus(postId, status);
        }
}

