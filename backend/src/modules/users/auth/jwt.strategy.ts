import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.NEXTAUTH_SECRET, // Same token & algorithm as frontend
      algorithms: ['HS256'],
    });
  }

  // Validate accessToken
  async validate(payload: any): Promise<any> {
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          id: payload.id,
          email: payload.email,
          deletedAt: null
        }
      })
      return user; 
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException();
    }
  }
}
