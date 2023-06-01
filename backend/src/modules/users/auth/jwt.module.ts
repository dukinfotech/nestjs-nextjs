import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthJwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtResolver } from './jwt.resolver';
import { EnvService } from 'src/config/enviroments/env.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => {
        return {
          secret: envService.appSecret,
          signOptions: {
            expiresIn: envService.appAccessTokenExpireIn,
            algorithm: 'HS256',
          },
        }
      }
    }),
  ],
  
  providers: [AuthJwtResolver, AuthJwtStrategy],
  exports: [AuthJwtStrategy, PassportModule],
})
export class AuthJwtModule {}
