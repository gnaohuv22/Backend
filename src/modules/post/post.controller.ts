import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { createPostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Not found', error: 'Not found' } } })
@ApiBadRequestResponse({ schema: { example: { statusCode: 400, message: 'Bad request', error: 'Bad request' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('post')
export class PostController {
    constructor(private readonly PostsService: PostService) {}

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
    @Get('/all')
    async getListPost(): Promise<PostEntity[]> {
        
        return await this.PostsService.getListPost();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
    @Get('/trending')
    async getSlidePost(): Promise<PostEntity[]> {

        return await this.PostsService.getPostOnTheSlide();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
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

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
    @Get('/side')
    async getNewestPosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getFourNextNewestPosts();
    }

    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
    @Get('/center')
    async getSidePosts(): Promise<PostEntity[]> {
        
        return await this.PostsService.getSixNewestPosts();
    }
   
    @ApiOkResponse({ schema: { example: { id: 'number', title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean'} } })
    @Get('/:postId')
    async getAPost(@Param('postId') postId: number): Promise<any> {
        
        return await this.PostsService.getAPost(postId);
    }

    @ApiOkResponse({ schema: {example: { message: 'Deleted successfully.' } } })
    @Delete('/:postId')
    async deletePost(@Param('postId') postId: number): Promise<createPostDto> {

        return await this.PostsService.removePost(postId);
    }

    @ApiOkResponse({ schema: {example: { message: 'Created successfully.' } } })
    @ApiCreatedResponse({ schema: { example: { title: 'string', content: 'string', image: 'string', category: 'string', onTheSlide: 'boolean', id: 'number' } } })
    @Post('')
    async createPost(@Body() post: createPostDto): Promise<any> {

        return await this.PostsService.createPost(post);
    }
 
    @ApiOkResponse({ schema: {example: {id: 'number', title: 'string', content: 'string', message: 'Updated successfully.'}}})
    @Put('/:postId')
    async updatePost(@Body() data : UpdatePostDto) {
        
        return await this.PostsService.updatePost(data);
    }
}

