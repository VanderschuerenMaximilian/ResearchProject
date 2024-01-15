import { Injectable } from '@nestjs/common';
// katas
import { KatasService } from '../katas/katas.service';
import { Kata } from 'src/katas/entities/kata.entity';
import * as katas from './data/katas.json'


@Injectable()
export class SeedService {
    constructor(
        private katasService: KatasService,
    ) {}

    async addKatasFromJSON() {
        let theKatas = []
        for (let kata of katas) {
            const k = new Kata()
            k.name = kata.name
            k.description = kata.description
            k.code = kata.code
            k.createdAt = new Date()
            k.updatedAt = new Date()
            
            theKatas.push(k)
        }

        return this.katasService.saveKatas(theKatas)
    }

    async truncateKatas() {
        return this.katasService.clearKatas()
    }
}
