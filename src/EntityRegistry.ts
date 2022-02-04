import {Service} from "typedi";
import {Organism} from "./Entities/Organism";

@Service()
export class EntityRegistry {
    private entitities:Array<Organism> = []

    add = (organism:Organism) =>{
        this.entitities.push(organism)
    }

    onGameLoop = () =>{
        this.entitities.forEach(entity => {
            entity.onGameLoop();
        })
    }
}