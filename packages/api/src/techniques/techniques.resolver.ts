import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TechniquesService } from './techniques.service';
import { Technique } from './entities/technique.entity';
import { CreateTechniqueInput } from './dto/create-technique.input';
import { UpdateTechniqueInput } from './dto/update-technique.input';

@Resolver(() => Technique)
export class TechniquesResolver {
  constructor(private readonly techniquesService: TechniquesService) {}

  @Mutation(() => Technique)
  createTechnique(@Args('createTechniqueInput') createTechniqueInput: CreateTechniqueInput) {
    return this.techniquesService.create(createTechniqueInput);
  }

  @Query(() => [Technique], { name: 'techniques' })
  findAll() {
    return this.techniquesService.findAll();
  }

  @Query(() => Technique, { name: 'technique' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.techniquesService.findOne(id);
  }

  @Mutation(() => Technique)
  updateTechnique(@Args('updateTechniqueInput') updateTechniqueInput: UpdateTechniqueInput) {
    return this.techniquesService.update(updateTechniqueInput.id, updateTechniqueInput);
  }

  @Mutation(() => Technique)
  removeTechnique(@Args('id', { type: () => Int }) id: number) {
    return this.techniquesService.remove(id);
  }
}
