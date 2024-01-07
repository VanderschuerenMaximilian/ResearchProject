import { Injectable } from '@nestjs/common';
import { CreateKataInput } from './dto/create-kata.input';
import { UpdateKataInput } from './dto/update-kata.input';

@Injectable()
export class KatasService {
  create(createKataInput: CreateKataInput) {
    return 'This action adds a new kata';
  }

  findAll() {
    return `This action returns all katas`;
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
