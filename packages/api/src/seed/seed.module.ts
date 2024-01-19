import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { KatasModule } from 'src/katas/katas.module';
import { CommandModule } from 'nestjs-command';
import { DatabaseSeedCommand } from './seed.command';
import { TechniquesModule } from 'src/techniques/techniques.module';

@Module({
  providers: [DatabaseSeedCommand, SeedService],
  imports: [KatasModule,TechniquesModule, CommandModule],
})
export class SeedModule {}
