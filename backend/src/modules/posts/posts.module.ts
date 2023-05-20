import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolver';

@Module({
  providers: [PostsResolver],
  exports: [],
})
export class PostsModule {}
