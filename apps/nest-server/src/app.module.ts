import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

const serveStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, '..', 'public')
});

@Module({
  imports: [serveStaticModule, CatsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
