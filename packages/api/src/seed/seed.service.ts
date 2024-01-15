import { Injectable } from '@nestjs/common';
// katas
import { KatasService } from '../katas/katas.service';
import { Kata } from 'src/katas/entities/kata.entity';
import * as katas from './data/katas.json'
// techniques
import { TechniquesService } from '../techniques/techniques.service';
import { Technique } from 'src/techniques/entities/technique.entity';
import * as techniques from './data/techniques.json'


@Injectable()
export class SeedService {
    constructor(
        private katasService: KatasService,
        private techniquesService: TechniquesService,
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

    async addTechniquesFromJSON() {
        let theTechniques = []
        
        for (let technique of techniques) {
            const t = new Technique()
            t.name = technique.name
            t.description = technique.description
            t.image = technique.image
            t.createdAt = new Date()
            t.updatedAt = new Date()
            
            theTechniques.push(t)
        }

        return this.techniquesService.saveTechniques(theTechniques)
    }

    async truncateTechniques() {
        return this.techniquesService.clearTechniques()
    }
}
