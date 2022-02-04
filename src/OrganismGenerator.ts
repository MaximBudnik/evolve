import {EntityRegistry} from "./EntityRegistry";
import {Service} from "typedi";
import {Organism} from "./Entities/Organism";
@Service()
export class OrganismGenerator {
    readonly entititesToGenerate = 1000
    constructor(private organismRegistry: EntityRegistry) {
    }

    generate = () =>{
        for (let i = 0; i < this.entititesToGenerate; i++) {
            this.organismRegistry.add(new Organism())
        }
    }
}