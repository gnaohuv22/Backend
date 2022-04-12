import { Body, Controller, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AdminService } from "../admin/admin.service";
import { AuthService } from "./auth.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";

@ApiForbiddenResponse({ schema: { example: { statusCode: 403, message: 'Email already registered', error: 'Forbidden' } } })
@ApiBadRequestResponse({ schema: { example: { statusCode: 400, message: 'Bad request', error: 'Bad request' } } })
@ApiUnauthorizedResponse({ schema: { example: { statusCode: 404, message: 'Email or password is incorrect', error: 'Unauthorized' } } })
@ApiInternalServerErrorResponse({ schema: { example: { statusCode: 500, message: 'Database connection error', error: 'Internal server error' } } })
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService
        ) {}

    @ApiOkResponse({ schema: { example: { accessToken: 'string', refreshToken: 'string' } } })
    @Post('/login')
    async login (@Body() authLogin: AuthLoginDto): Promise<any> {
        return await this.authService.login(authLogin);
    }

    @ApiOkResponse({ schema: { example: { message: 'Registered successfully' } } })
    @Post('/register')
    async register(@Body() authRegister: AuthRegisterDto): Promise<any> {
        return await this.adminService.addAdmin(authRegister);
    }
} 
