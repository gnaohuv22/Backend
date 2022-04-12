import { CACHE_MANAGER, forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { AdminEntity } from "../admin/admin.entity";
import { AdminService } from "../admin/admin.service";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { config } from 'dotenv';
config()
@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => AdminService)) private adminService: AdminService,
        private jwtService: JwtService,
        //@Inject(CACHE_MANAGER) private cacheManager: CacheManager,
        ) {}

    async login(authLogin: AuthLoginDto): Promise<any> {
        const admin = await this.adminService.adminLogin(authLogin);
        const accessToken = this.generateToken
        (admin.id, admin.email, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPIRATION);
        return {
            accessToken: accessToken,
        }
    }

    generateToken(id: number, email: string, secretSignature: string, tokenLife: string) {
        const options: JwtSignOptions = { secret: secretSignature };
        options.expiresIn = tokenLife
        return this.jwtService.sign({
            id: id,
            email: email,
        }, options);
    }

    verifyToken(tokenFromClient: string) {
        const options: JwtSignOptions = {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        };
        let decoded = this.jwtService.decode(tokenFromClient) as { id: number, email: string};
        if (!decoded) {
            return {
                idValid: false,
                message: "Invalid token",
                id: -1,
                email: ''
            };
        }
        try {
            this.jwtService.verify<{id: number, email: string}>(tokenFromClient, options);
            return {
                isValid: true,
                message: 'Access token is invalid',
                ...decoded
            };
        } catch (error) {
            return {
                isValid: false,
                message: 'Access token expired',
                ...decoded
            };
        }
    }
}
