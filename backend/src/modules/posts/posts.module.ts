import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolver';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Module({
  providers: [PostsResolver, PrismaService],
  exports: [],
})
export class PostsModule {}
