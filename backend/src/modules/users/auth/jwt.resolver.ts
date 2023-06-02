import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/user/user.model';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AuthJwtGuard, CurrentUser } from './jwt.guard';
import { AuthJwtService } from './jwt.service';
import { AuthJwtRefreshGuard } from './jwt-refresh.guard';

@ObjectType()
export class SignInResponse extends User {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;
}
@ObjectType()
export class TokensResponse {
  @Field(() => String, { nullable: false })
  accessToken!: string;

  @Field(() => String, { nullable: false })
  refreshToken!: string;
}

@Resolver(() => User)
export class AuthJwtResolver {
  constructor(
    private prismaService: PrismaService,
    private authJwtService: AuthJwtService,
  ) {}

  @Mutation(() => SignInResponse, { name: 'signIn' })
  async signIn(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: { email, deletedAt: null },
      });
      const isMatch = bcrypt.compareSync(password, user.hashedPassword);

      if (isMatch) {
        const { hashedPassword, ...userWithOutPassword } = user;
        const tokens = await this.authJwtService.getTokens(user);
        this.authJwtService.updateHashedRefreshToken(user, tokens.refreshToken);
        return {
          ...userWithOutPassword,
          ...tokens,
        };
      }
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }

  @Query(() => TokensResponse, { name: 'refreshTokens' })
  @UseGuards(AuthJwtRefreshGuard)
  async refreshTokens(@CurrentUser() user: User, @Context() context) {
    const bearerToken = context.req.headers.authorization;
    const refreshToken = bearerToken.replace('Bearer', '').trim();
    const isMatch = bcrypt.compareSync(refreshToken, user.hashedRefreshToken);

    if (isMatch) {
      const tokens = await this.authJwtService.getTokens(user);
      this.authJwtService.updateHashedRefreshToken(user, tokens.refreshToken);
      return tokens;
    }
  }

  @Mutation(() => Boolean, { name: 'signOut' })
  @UseGuards(AuthJwtGuard)
  async signOut(@CurrentUser() user: User) {
    return this.authJwtService.signOut(user);
  }
}
