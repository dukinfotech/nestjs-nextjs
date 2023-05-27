import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/user/user.model';
import { PrismaService } from 'src/config/prisma/prisma.service';


@Resolver(() => User)
export class AuthJwtResolver {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  @Query(() => User, { name: 'signIn' })
  async signIn(
    @Args('email', { type: () => String }) signInEmail: string,
    @Args('password', { type: () => String }) signInPassword: string,
  ) {
    try {
      const signInUser = await this.prismaService.user.findUnique({
        where: { email: signInEmail },
      });
  
      const isMatch = bcrypt.compareSync(signInPassword, signInUser.password);
  
      if (isMatch) {
        const payload = {
          id: signInUser.id,
          name: signInUser.name,
          username: signInUser.username,
          email: signInUser.email,
        };
        this.jwtService.signAsync(payload);
        return payload;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
