import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostEntity } from './modules/post/post.entity';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'gnaohuv',
    database: 'demo',
    entities: [PostEntity],
    synchronize: true,
}), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
