/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CatsService } from '../cats.service';
import { ICat } from '../interfaces';
import { Cat } from './cat.model';

@Resolver((of: Cat) => Cat)
export class CatsResolver {
  constructor(private catsService: CatsService) {}

  @Query(returns => [Cat], { name: 'cats' })
  async getCats(): Promise<ICat[]> {
    return this.catsService.findAll();
  }

  @Query(returns => Cat, { name: 'cat' })
  async getCat(@Args('id', { type: () => String }) id: string): Promise<ICat> {
    return this.catsService.findById(id);
  }

  @Query(returns => Cat, { name: 'catByName' })
  async getCatByName(
    @Args('name', { type: () => String }) name: string
  ): Promise<ICat> {
    return this.catsService.findByName(name);
  }

  @Query(returns => [Cat], { name: 'catsByBreed' })
  async getAllCatsByBreed(
    @Args('breed', { type: () => String }) breed: string
  ): Promise<ICat[]> {
    return this.catsService.getByBreed(breed);
  }
}
