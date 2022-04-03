import { PostEntity } from './post.entity'
import { Module } from '@nestjs/common';
import { NewestPostService, PostService } from './post.service';
import { NewestPostsController, PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, NewestPostService],
  controllers: [PostController, NewestPostsController],
  exports: [PostService, NewestPostService]
})
export class PostModule {}
