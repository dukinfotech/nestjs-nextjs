import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import * as path from 'path';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get<string>('APP_ENV') === 'production';
  }

  get service() {
    return this.configService;
  }

  get appEnv(): string {
    return this.configService.get<string>('APP_ENV');
  }

  get appSecret(): string {
    return this.configService.get<string>('APP_SECRET');
  }

  get appAccessTokenExpireIn(): number {
    return this.configService.get<number>('APP_ACCESS_TOKEN_EXPIRE_IN');
  }

  get appRefreshTokenExpireIn(): number {
    return this.configService.get<number>('APP_REFRESH_TOKEN_EXPIRE_IN');
  }

  get graphQLDefinitionPath(): string {
    return this.configService.get<string>('GRAPHQL_DEFINITION_PATH');
  }

  get GqlModuleOptionsFactory(): GqlModuleOptions {
    const devOptions: any = {
      autoSchemaFile: path.join(
        process.cwd(),
        this.graphQLDefinitionPath
      ),
      sortSchema: true,
      debug: true,
      playground: true,
    };

    const prdOptions: any = {
      autoSchemaFile: true,
      debug: false,
      playground: false,
    };

    if (this.isProduction()) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }
}
