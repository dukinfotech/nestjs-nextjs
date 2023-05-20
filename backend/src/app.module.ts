import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { PostsModule } from './modules/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvModule } from './config/enviroments/env.module';
import { EnvService } from './config/enviroments/env.service';

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
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
