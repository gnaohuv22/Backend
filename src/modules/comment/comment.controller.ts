import { Controller, Get } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { CommentService } from './comment.service';

@ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: 'Access token is invalid', error: 'Unauthorized' } } })
@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Access token expired', error: 'Forbidden' } } })
@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Token not found', error: 'Not found' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}
    
    @ApiOkResponse({ schema: {example: {id: 'number', image: 'string', content: 'string' } } })
    @Get()
    async getComment() {
        return await this.commentService.getComment();
    }
}
