import random from "random";
import {Movable} from "./Movable";

export class Organism extends Movable {
    onGameLoop = () => {
        const x = random.float(this.graphics.position.x - 100, this.graphics.position.x + 100)
        const y = random.float(this.graphics.position.y - 100, this.graphics.position.y + 100)
        this.move(x, y)
    }
}