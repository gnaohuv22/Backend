import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostEntity } from './modules/post/post.entity';
import { PostModule } from './modules/post/post.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminEntity } from './modules/admin/admin.entity';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'gnaohuv',
    database: 'demo',
    autoLoadEntities: true,
    synchronize: true,
}), PostModule, AuthModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
