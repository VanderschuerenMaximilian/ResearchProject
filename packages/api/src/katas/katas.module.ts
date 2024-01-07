import { Module } from '@nestjs/common';
import { KatasService } from './katas.service';
import { KatasResolver } from './katas.resolver';

@Module({
  providers: [KatasResolver, KatasService],
})
export class KatasModule {}
