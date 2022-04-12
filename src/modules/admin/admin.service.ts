import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthLoginDto } from '../auth/dto/auth-login.dto';
import { AuthRegisterDto } from '../auth/dto/auth-register.dto';
import { AdminEntity } from './admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>
    ) {}

    async getAdmin() {
        return await this.adminRepo.find();
    }

    async findById(id: string): Promise<AdminEntity> {
        const result = await this.adminRepo.findOne(id);
        if (result == null) {
            throw new NotFoundException('ID not found');
        }
        try {
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async findByEmail(email: string): Promise<AdminEntity> {
        const result = await this.adminRepo.findOne({
                where: { email: email }
            });
        return result;
        
    }

    async addAdmin(authRegister: AuthRegisterDto): Promise<AdminEntity> {

        const adminEmail = await this.adminRepo.findOne({
            where: { email: authRegister.email }
        });
        if (adminEmail == null) {
            try {
                const hashedPassword = await bcrypt.hash(authRegister.password, 10);
                const adminEntity = new AdminEntity();
                adminEntity.name = authRegister.name;
                adminEntity.email = authRegister.email;
                adminEntity.password = hashedPassword;

                const result = await this.adminRepo.save(adminEntity);
                return result;
            } catch (error) {
                throw new InternalServerErrorException('Internal Server Error');
            }
        } else {
            throw new ForbiddenException(`Email ${authRegister.email} already exists`);
        }
    }

    async adminLogin(authLogin: AuthLoginDto): Promise<AdminEntity> {

        const admin = await this.findByEmail(authLogin.email);
        if (admin == null) {
            throw new NotFoundException('Admin not found');
        } else {
            try {
                const isValid = await bcrypt.compare(authLogin.password, admin.password);
                if (!isValid) {
                    throw new BadRequestException('Bad request');
                }
                return admin;
            } catch (error) {
                throw new InternalServerErrorException('Internal Server Error');
            }
        }
    }
}
