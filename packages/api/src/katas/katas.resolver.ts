import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KatasService } from './katas.service';
import { Kata } from './entities/kata.entity';
import { CreateKataInput } from './dto/create-kata.input';
import { UpdateKataInput } from './dto/update-kata.input';

@Resolver(() => Kata)
export class KatasResolver {
  constructor(private readonly katasService: KatasService) {}

  @Mutation(() => Kata)
  createKata(@Args('createKataInput') createKataInput: CreateKataInput): Promise<Kata> {
    return this.katasService.create(createKataInput);
  }

  @Query(() => [Kata], { name: 'katas' })
  findAll() {
    return this.katasService.findAll();
  }

  @Query(() => Kata, { name: 'kata' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.katasService.findOne(id);
  }

  @Mutation(() => Kata)
  updateKata(@Args('updateKataInput') updateKataInput: UpdateKataInput) {
    return this.katasService.update(updateKataInput.id, updateKataInput);
  }

  @Mutation(() => Kata)
  removeKata(@Args('id', { type: () => Int }) id: number) {
    return this.katasService.remove(id);
  }
}
