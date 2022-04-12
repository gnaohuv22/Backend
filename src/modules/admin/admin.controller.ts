import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) {}

    @ApiOkResponse({ schema: {example: {id: 'number', name: 'string', email: 'string' } } })
    @Get('')
    async getAdmin() {
        return await this.adminService.getAdmin();
    }
}