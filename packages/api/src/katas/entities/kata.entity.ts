import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType({ description: 'Kata model'})
export class Kata {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  test: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
