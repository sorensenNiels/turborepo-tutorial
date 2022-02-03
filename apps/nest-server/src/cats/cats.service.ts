import { Injectable } from '@nestjs/common';
import { cats } from './data/cats.json';
import { Cat } from './interfaces';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = cats;

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
