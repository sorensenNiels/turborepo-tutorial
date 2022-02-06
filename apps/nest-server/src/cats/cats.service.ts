import { Injectable } from '@nestjs/common';
import cuid from 'cuid';
import _ from 'lodash';
import { cats } from './data/cats.json';
import { Cat } from './interfaces';

@Injectable()
export class CatsService {
  private readonly cats: Cat[];

  constructor() {
    this.cats = _.map(cats, cat => {
      return { ...cat, id: cuid() };
    });
  }

  create(cat: Cat) {
    const id = cuid();
    this.cats.push({ ...cat, id });
    return { id };
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findByName(name: string) {
    return _.find(this.cats, { name });
  }

  delete(id: string) {
    return _.remove(this.cats, { id });
  }
}
