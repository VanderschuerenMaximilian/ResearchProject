import { CreateTechniqueInput } from './create-technique.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTechniqueInput extends PartialType(CreateTechniqueInput) {
  @Field(() => Int)
  id: number;
}
