import { Injectable, Param, Get } from '@nestjs/common';
import { CreateTechniqueInput } from './dto/create-technique.input';
import { UpdateTechniqueInput } from './dto/update-technique.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Technique } from './entities/technique.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TechniquesService {
  constructor(
    @InjectRepository(Technique)
    private readonly techniquesRepository: MongoRepository<Technique>,
  ) {

  }

  create(createTechniqueInput: CreateTechniqueInput) {
    return 'This action adds a new technique';
  }

  @Get()
  findAll() {
    return this.techniquesRepository.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Technique> {
    // @ts-ignore
    return this.techniquesRepository.findOne({ _id: new ObjectId(id) });
  }

  @Get(':name')
  findByName(@Param('name') name: string): Promise<Technique> {
    const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return this.techniquesRepository.findOne({ where: { name: nameCapitalized } });
  }

  update(id: number, updateTechniqueInput: UpdateTechniqueInput) {
    return `This action updates a #${id} technique`;
  }

  remove(id: number) {
    return `This action removes a #${id} technique`;
  }

  // for seeding

  saveTechniques(techniques: Technique[]): Promise<Technique[]> {
    return this.techniquesRepository.save(techniques);
  }

  clearTechniques(): Promise<void> {
    return this.techniquesRepository.clear();
  }

}