import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from 'src/config/enviroments/env.service';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AuthJwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private prismaService: PrismaService,
    private envService: EnvService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.appSecret,
      ignoreExpiration: false,
      algorithms: ['HS256'],
    });
  }

  // Validate refreshToken
  async validate(payload: any): Promise<any> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          id: payload.id,
          email: payload.email,
          deletedAt: null,
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}
