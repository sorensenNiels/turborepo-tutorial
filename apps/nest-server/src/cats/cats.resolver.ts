/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './interfaces';
import { CatModel } from './models/cat.model';

@Resolver((of: CatModel) => CatModel)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(returns => CatModel, { name: 'cat' })
  async getCat(@Args('id', { type: () => String }) id: string): Promise<Cat> {
    return this.catsService.findById(id);
  }

  @Query(returns => CatModel, { name: 'catByName' })
  async getCatByName(
    @Args('name', { type: () => String }) name: string
  ): Promise<Cat> {
    return this.catsService.findByName(name);
  }

  @Query(returns => [CatModel], { name: 'catsByBreed' })
  async getAllCatsByBreed(
    @Args('breed', { type: () => String }) breed: string
  ): Promise<Cat[]> {
    return this.catsService.getByBreed(breed);
  }
}
