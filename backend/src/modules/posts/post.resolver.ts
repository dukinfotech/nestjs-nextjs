import { Query, Resolver } from '@nestjs/graphql';
import { Post } from 'generated/post/post.model';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AuthJwtGuard, CurrentUser } from '../users/auth/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { User } from 'generated/user/user.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [Post], { name: 'posts', nullable: true })
  @UseGuards(AuthJwtGuard)
  async getPosts(@CurrentUser() user: User) {
    console.log(user)
    return await this.prismaService.post.findMany();
  }
}