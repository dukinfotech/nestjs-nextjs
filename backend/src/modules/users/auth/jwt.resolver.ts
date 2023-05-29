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
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user.deletedAt) {
      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        const { password, ...userWithOutPassword } = user;
        const payload = { id: user.id, email: user.email };

        this.jwtService.signAsync(payload);
        return userWithOutPassword;
      }
    }

    throw new UnauthorizedException();
  }
}
