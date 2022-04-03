import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminEntity } from './modules/admin/admin.entity';
import { AdminModule } from './modules/admin/admin.module';
import { CommentEntity } from './modules/comment/comment.entity';
import { CommentModule } from './modules/comment/comment.module';
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
    entities: [AdminEntity, CommentEntity, PostEntity],
    synchronize: true,
}), AdminModule, CommentModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
