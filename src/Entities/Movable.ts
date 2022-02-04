import {Entity} from "./Entity";
import random from "random";
import {Tween} from "tweedle.js";
import {Engine} from "../Engine";
import {World} from "../World";

export class Movable extends Entity {
    speed: number = 5
    move = (x: number, y: number) => {
        if (x > World.size || x < 0 || y > World.size || y < 0) {
            return
        }
        // @ts-ignore
        new Tween(this.graphics.position).to({x, y}, Engine.gameLoopTimeout).start();
    }
}