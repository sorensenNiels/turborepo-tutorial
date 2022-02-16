import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

const serveStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public')
});

const graphQLModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  debug: true,
  playground: true,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql')
});

@Module({
  imports: [graphQLModule, serveStaticModule, CatsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
