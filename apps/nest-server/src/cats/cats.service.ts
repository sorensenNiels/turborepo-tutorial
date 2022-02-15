import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@packages/nest-problem-details';
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

  create(cat: Cat): Pick<Cat, 'id'> {
    const id = cuid();
    this.cats.push({ ...cat, id });
    return { id };
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findByName(name: string): Cat {
    const cat = _.find(this.cats, { name });

    if (!cat) {
      throw new UnprocessableEntityException();
    }

    return cat;
  }

  delete(id: string): Cat {
    const cat = _.find(this.cats, { id });

    if (!cat) {
      throw new UnprocessableEntityException();
    }

    return cat;
  }
}
