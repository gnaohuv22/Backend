import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { createCommentDto } from './dto/createComment.dto';
import { UpdateCommentDto } from './dto/updateComment.dto';

@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}
    
    @ApiOkResponse({ schema: {example: {id: 'number', image: 'string', content: 'string' } } })
    @Get('')
    async getComment() {
        return await this.commentService.getComment();
    }

    @Post('')
    async addComment(@Body() comment: createCommentDto): Promise<any> {

        return await this.commentService.addComment(comment);
    }

    @ApiOkResponse({ schema: {example: {name: 'string', content: 'string' } } })
    @Put('/edit/:id')
    async editComment(@Body() data: UpdateCommentDto) {
        
        return await this.commentService.editComment(data);
    }
}
