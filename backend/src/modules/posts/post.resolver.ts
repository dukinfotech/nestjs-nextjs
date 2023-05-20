import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './post.model';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return await this.prismaService.post.findMany();
  }
}