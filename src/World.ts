import {Inject, Service} from "typedi";
import {EntityRegistry} from "./EntityRegistry";

@Service()
export class World {
    static readonly size = 4000

    constructor(
        @Inject()
        private entityRegistry: EntityRegistry,
    ) {
    }

    onGameLoop = () =>{
        this.entityRegistry.onGameLoop()
    }
}