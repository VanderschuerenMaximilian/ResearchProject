import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateKataInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
