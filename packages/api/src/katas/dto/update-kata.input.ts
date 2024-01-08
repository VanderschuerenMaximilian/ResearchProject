import { CreateKataInput } from './create-kata.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateKataInput extends PartialType(CreateKataInput) {
  @Field(() => Int)
  id: number;
}
