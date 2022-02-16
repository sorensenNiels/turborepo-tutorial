import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatsResolver } from './graphql/cats.resolver';

@Module({
  controllers: [CatsController],
  providers: [CatsResolver, CatsService]
})
export class CatsModule {}
