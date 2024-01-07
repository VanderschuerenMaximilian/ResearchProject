import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateKataInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
