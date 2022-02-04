import {Graphics} from "pixi.js";
import {Container} from "typedi";
import {v4} from "uuid";
import random from "random";
import {Viewport} from "pixi-viewport";

export class EntityBase {
    readonly id: string
    protected graphics: Graphics;

    constructor() {
        this.id = v4()
        this.buildGraphics()
    }

    protected getViewport = () => Container.get<Viewport>('viewport');

    protected buildGraphics = () => {
        this.graphics = new Graphics()
        this.graphics.position.set(random.int(0, 4000), random.int(0, 4000))
        this.graphics.beginFill(0xDE3249);
        this.graphics.drawRect(0, 0, 16, 16);
        this.graphics.endFill();
        this.getViewport().addChild(this.graphics);
    }
}

export class Entity extends EntityBase {
    // protected taskQueue: Array<Function> = []
    onGameLoop = () => {
        // if(this.taskQueue.length){
        //     (this.taskQueue.shift())()
        // }
    }
}

