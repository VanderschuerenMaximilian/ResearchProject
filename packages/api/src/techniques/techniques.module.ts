import { Module } from '@nestjs/common';
import { TechniquesService } from './techniques.service';
import { TechniquesResolver } from './techniques.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technique } from './entities/technique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technique])],
  providers: [TechniquesResolver, TechniquesService],
  exports: [TechniquesService],
})
export class TechniquesModule {}
