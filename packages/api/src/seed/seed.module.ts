import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { KatasModule } from 'src/katas/katas.module';
import { CommandModule } from 'nestjs-command';
import { DatabaseSeedCommand } from './seed.command';

@Module({
  providers: [DatabaseSeedCommand, SeedService],
  imports: [KatasModule, CommandModule],
})
export class SeedModule {}
