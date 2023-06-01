import { Injectable } from '@nestjs/common';
import { User } from 'generated/user/user.model';
import { AuthJwtTokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { EnvService } from 'src/config/enviroments/env.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthJwtService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  async getTokens(user: User): Promise<AuthJwtTokens> {
    const payload = { id: user.id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.envService.appAccessTokenExpireIn,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: this.envService.appRefreshTokenExpireIn,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async updateHashedRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken: hashedRefreshToken },
    });
  }

  async signOut(user: User): Promise<boolean> {
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { hashedRefreshToken: { set: null } },
    });

    return true;
  }
}
