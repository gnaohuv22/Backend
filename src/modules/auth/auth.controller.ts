import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AdminService } from "../admin/admin.service";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Email already registered', error: 'Forbidden' } } })
@ApiNotFoundResponse({ schema: { example: { statusCode: 404, message: 'Email not found', error: 'Not found' } } })
@ApiBadRequestResponse({ schema: { example: { statusCode: 400, message: 'Bad request', error: 'Bad request' } } })
@ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: 'Email or password is incorrect', error: 'Unauthorized' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService
        ) {}

    @ApiCreatedResponse({ schema: { example: { accessToken: 'string', refreshToken: 'string' } } })
    @Post('/login')
    async login (@Body() authLogin: AuthLoginDto): Promise<any> {
        return await this.authService.login(authLogin);
    }

    @ApiCreatedResponse({ schema: { example: { name: 'string', email: 'string', password: 'string', id: 'number' } } })
    @ApiUnauthorizedResponse({ schema: { example: { statusCode: 401, message: 'Email or password is incorrect', error: 'Unauthorized' } } })
    @Post('/register')
    async register(@Body() authRegister: AuthRegisterDto): Promise<any> {
        return await this.adminService.addAdmin(authRegister);
    }
} 
