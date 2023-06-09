import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { PostsModule } from './modules/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvModule } from './config/enviroments/env.module';
import { EnvService } from './config/enviroments/env.service';
import { PrismaModule } from './config/prisma/prisma.module';
import { AuthJwtModule } from './modules/users/auth/jwt.module';

@Module({
  imports: [
    EnvModule,
    // Config GraphQL
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [EnvService],
      useFactory: (envService: EnvService) =>
        envService.GqlModuleOptionsFactory,
    }),
    PrismaModule,
    AuthJwtModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
