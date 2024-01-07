import { Injectable } from '@nestjs/common';
import { CreateKataInput } from './dto/create-kata.input';
import { UpdateKataInput } from './dto/update-kata.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Kata } from './entities/kata.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KatasService {
  constructor(
  @InjectRepository(Kata)
  private readonly kataRepository: Repository<Kata>,
) {}

  create(createKataInput: CreateKataInput): Promise<Kata> {
    const k = new Kata();
    k.name = createKataInput.name;
    k.description = createKataInput.description;
    
    return this.kataRepository.save(k);
  }

  findAll() {
    return this.kataRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} kata`;
  }

  update(id: number, updateKataInput: UpdateKataInput) {
    return `This action updates a #${id} kata`;
  }

  remove(id: number) {
    return `This action removes a #${id} kata`;
  }
}
