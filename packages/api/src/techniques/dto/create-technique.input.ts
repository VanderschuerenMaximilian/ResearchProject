import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTechniqueInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
