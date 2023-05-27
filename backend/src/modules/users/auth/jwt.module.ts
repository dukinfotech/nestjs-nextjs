import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtResolver } from './jwt.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.NEXTAUTH_SECRET, // Same token & algorithm as frontend
      signOptions: {
        expiresIn: '1h',
        algorithm: 'HS512',
      },
    }),
  ],

  providers: [AuthJwtResolver, AuthJwtStrategy],
  exports: [AuthJwtStrategy, PassportModule],
})
export class AuthJwtModule {}
