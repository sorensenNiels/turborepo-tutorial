import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ICat } from '../interfaces';

@ObjectType()
export class Cat implements ICat {
  @Field(_type => String)
  id!: string;

  @Field(_type => String)
  name!: string;

  @Field(_type => Int)
  age!: number;

  @Field(_type => String)
  breed!: string;
}
