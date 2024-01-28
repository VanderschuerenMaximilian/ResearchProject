import { Injectable } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { Command } from "nestjs-command";

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

    @Command({
        command: 'seed:database:katas',
        describe: 'seed the database with katas',
    })
    async seedKatas() {
        console.log('seeding katas...')
        await this.seedService.truncateKatas()
        const katas = await this.seedService.addKatasFromJSON()
        console.log(`done seeding ${katas.length} kata(s)`)
    }

    @Command({
        command: 'seed:reset:katas',
        describe: 'reset the database with katas',
    })
    async deleteKatas() {
        console.log('resetting katas...')
        await this.seedService.truncateKatas()
        console.log('done resetting katas')
    }

    @Command({
        command: 'seed:database:techniques',
        describe: 'seed the database with techniques',
    })
    async seedTechniques() {
        console.log('seeding techniques...')
        await this.seedService.truncateTechniques()
        const techniques = await this.seedService.addTechniquesFromJSON()
        console.log(`done seeding ${techniques.length} technique(s)`)
    }

    @Command({
        command: 'seed:reset:techniques',
        describe: 'reset the database with techniques',
    })
    async deleteTechniques() {
        console.log('resetting techniques...')
        await this.seedService.truncateTechniques()
        console.log('done resetting techniques')
    }

    @Command({
        command: 'seed:database',
        describe: 'seed the database with katas and techniques',
    })
    async seedDatabase() {
        await this.seedKatas()
        await this.seedTechniques()
    }
}