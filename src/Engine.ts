import {Container, Inject, Service} from "typedi";
import {EntityRegistry} from "./EntityRegistry";
import {OrganismGenerator} from "./OrganismGenerator";
import {Application, filters, Graphics, utils} from "pixi.js";
import {Group} from "tweedle.js";
import {Viewport} from "pixi-viewport";
import {Colors} from "./colors";
import {World} from "./World";
import {ContainerKeys} from "./utils/ContainerKeys";

@Service()
export class Engine {
    static readonly gameLoopTimeout = 500
    static readonly renderLoopTimeout = 100
    private render: Application
    private readonly viewport: Viewport

    constructor(
        @Inject()
        private world: World,
    ) {
        this.render = new Application({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: utils.string2hex(Colors.background),
        });
        this.viewport = new Viewport({
            // screenHeight: World.size,
            // screenWidth:World.size,
            worldWidth: World.size,
            worldHeight: World.size,
            interaction: this.render.renderer.plugins.interaction,
        })
        this.viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate()
        this.render.stage.addChild(this.viewport)
        Container.set(ContainerKeys.viewport, this.viewport);
        Container.set(ContainerKeys.render, this.render);
        this.viewport.fitWorld()
        this.world.init()
    }

    start = () => {
        document.body.appendChild(this.render.view)
        this.gameLoop()
        this.tweenLoop()
        this.renderLoop()
    }

    private gameLoopCount = 0
    private renderLoopCount = 0

    private gameLoop = () => {
        // console.log(performance.now())
        this.world.onGameLoop(this.gameLoopCount)
        this.gameLoopCount++
        if(this.gameLoopCount > 100){
            this.gameLoopCount = 0
        }
        setTimeout(this.gameLoop, Engine.gameLoopTimeout)
    }

    private renderLoop = () =>{
        // this.world.onRenderLoop(this.renderLoopCount)
        // this.renderLoopCount++
        // if(this.renderLoopCount > 1000){
        //     this.renderLoopCount = 0
        // }
        // setTimeout(this.renderLoop, Engine.renderLoopTimeout)
    }

    tweenLoop = () => {
        Group.shared.update();
        requestAnimationFrame(this.tweenLoop);
    }
}
