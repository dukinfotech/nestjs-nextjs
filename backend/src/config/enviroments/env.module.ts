import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-validator';
import { EnvService } from './env.service';
import * as path from 'path';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(path.dirname(process.cwd()), '.env'),
      validate,
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}