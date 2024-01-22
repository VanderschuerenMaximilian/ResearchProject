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

  @Get()
  findOneBasedOnModel(@Param('base64') base64: string) {
    const response = this.loadModel(base64);
    console.log(response);
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

  // extra functions

  async loadModel(base64Code) {
    try {
      const response = await fetch(
        'https://predict.cogniflow.ai/image/object-detection/detect/6a60d7f8-057f-4847-b881-a2289ced144a',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': '48cf32e3-0f46-4cd8-a7e1-5315d115eb4d',
          },
          body: JSON.stringify({
            format: 'base64',
            base64_image: base64Code,
            confidence_threshold: 0,
            normalize_boxes: false,
          }),
        },
      )
      return response.json()
    } catch (e) {
      console.error('error', e)
    }
  }
}
