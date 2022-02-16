import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cat } from '../interfaces';

@ObjectType()
export class CatModel implements Cat {
  @Field(_type => String)
  id!: string;

  @Field(_type => String)
  name!: string;

  @Field(_type => Int)
  age!: number;

  @Field(_type => String)
  breed!: string;
}
