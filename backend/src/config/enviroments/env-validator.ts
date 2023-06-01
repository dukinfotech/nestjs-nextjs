import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

enum AppEnvEnum {
  Development = 'development',
  Test = 'test',
  Stage = 'stage',
  Production = 'production',
}

/**
 * ①
 * バリデーションしたい環境変数がある場合はここに記載してください。
 * バリデーションに失敗するとアプリケーションは起動しません。
 */
export class EnvValidator {
  @IsEnum(AppEnvEnum)
  APP_ENV: AppEnvEnum;

  @IsNotEmpty()
  @IsString()
  APP_SECRET: string;

  @IsNotEmpty()
  @IsNumber()
  APP_ACCESS_TOKEN_EXPIRE_IN: number;

  @IsNotEmpty()
  @IsNumber()
  APP_REFRESH_TOKEN_EXPIRE_IN: number;

  @IsNotEmpty()
  @IsString()
  DB_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}