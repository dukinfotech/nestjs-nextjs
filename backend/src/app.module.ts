import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';
import { AppController } from './app.controller';
import { PostsModule } from './modules/posts/posts.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Config configurations
    ConfigModule.forRoot({
      envFilePath: path.join(path.dirname(process.cwd()), '.env'), // Config .env file place
    }),
    // Config GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.APP_ENV !== 'production', // Create '/graphql' route for debugging
      // Config schema.gql file place
      autoSchemaFile:
        process.env.APP_ENV !== 'production'
          ? path.join(process.cwd(), process.env.GRAPHQL_DEFINITION_PATH)
          : true,
      sortSchema: true,
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
