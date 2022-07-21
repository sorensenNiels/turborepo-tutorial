import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@packages/nest-problem-details';
import cuid from 'cuid';
import _ from 'lodash';
import { cats } from './data/cats.json';
import type { ICat } from './interfaces';

@Injectable()
export class CatsService {
  private cats: ICat[];

  constructor() {
    this.cats = _.map(cats, (cat) => {
      return { ...cat, id: cuid() };
    });
  }

  async create(cat: ICat): Promise<ICat> {
    const newCat = { ...cat, id: cuid() };
    this.cats.push(newCat);
    return newCat;
  }

  async findAll(): Promise<ICat[]> {
    return this.cats;
  }

  async findById(id: string): Promise<ICat> {
    const cat = _.find(this.cats, { id });

    if (!cat) {
      throw new UnprocessableEntityException();
    }

    return cat;
  }

  async findByName(name: string): Promise<ICat> {
    const cat = _.find(this.cats, { name });

    if (!cat) {
      throw new UnprocessableEntityException();
    }

    return cat;
  }

  async getByBreed(breed: string): Promise<ICat[]> {
    return _.filter(this.cats, { breed });
  }

  async delete(id: string): Promise<void> {
    const cat = _.remove(this.cats, { id });

    if (cat.length === 0) {
      throw new UnprocessableEntityException();
    }
  }
}
