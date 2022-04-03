import { Controller, Get } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: 'Access token is invalid', error: 'Unauthorized' } } })
@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Access token expired', error: 'Forbidden' } } })
@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Token not found', error: 'Not found' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ) {}
    
    @ApiOkResponse({ schema: {example: {id: 'number', image: 'string', content: 'string' } } })
    @Get()
    async getAdmin() {
        return await this.adminService.getAdmin();
    }
}
