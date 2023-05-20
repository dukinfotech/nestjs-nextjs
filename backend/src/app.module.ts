import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql";
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Config configurations
    ConfigModule.forRoot({
      envFilePath: path.join(path.dirname(process.cwd()), '.env') // Config .env file place
    }),
    // Config GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.APP_ENV === 'development', // If true, create '/graphql' route for debugging
      autoSchemaFile: path.join(process.cwd(), process.env.GRAPHQL_DEFINITION_PATH), // Config schema.gql file place
      sortSchema: true,
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
