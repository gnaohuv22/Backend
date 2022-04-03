import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(AdminEntity) private adminRepo: Repository<AdminEntity>
    ) {}

    async getAdmin() {
        return await this.adminRepo.find();
    }
}
