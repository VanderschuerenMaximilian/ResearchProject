import { Module } from '@nestjs/common';
import { KatasService } from './katas.service';
import { KatasResolver } from './katas.resolver';
import { Kata } from './entities/kata.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Kata])],
  providers: [KatasResolver, KatasService],
  exports: [KatasService],
})
export class KatasModule {}
