import { Query, Resolver } from '@nestjs/graphql';
import { Post } from 'generated/post/post.model';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [Post], { name: 'posts', nullable: true })
  async getPosts() {
    return await this.prismaService.post.findMany();
  }
}