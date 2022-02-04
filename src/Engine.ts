import {Container, Inject, Service} from "typedi";
import {EntityRegistry} from "./EntityRegistry";
import {OrganismGenerator} from "./OrganismGenerator";
import {Application, filters, Graphics, utils} from "pixi.js";
import {Group} from "tweedle.js";
import {Viewport} from "pixi-viewport";
import {Colors} from "./colors";
import {World} from "./World";

@Service()
export class Engine {
    static readonly loopTimeout = 500
    private render: Application
    private readonly viewport: Viewport
    private water: Graphics

    constructor(
        @Inject()
        private organismGenerator: OrganismGenerator,
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
        Container.set('viewport', this.viewport);
        this.viewport.fitWorld()
        this.drawWater()
    }

    drawWater = () => {
        this.water = this.viewport.addChild(new Graphics())
        const [r, g, b] = utils.hex2rgb(utils.string2hex(Colors.water))
        const blockHeight = World.size / 10
        for (let i = 0; i < 10; i++) {
            const start = blockHeight * i
            const k = (i * 7.5) / 255
            const color = utils.rgb2hex([r - k, g - k, b - k])
            this.water.beginFill(color)
            this.water.drawRect(0, start, World.size, blockHeight)
        }

    }

    start = () => {
        this.organismGenerator.generate()
        document.body.appendChild(this.render.view)
        this.gameLoop()
        this.tweenLoop()
    }

    private gameLoop = () => {
        console.log(performance.now())
        this.world.onGameLoop()
        setTimeout(this.gameLoop, Engine.loopTimeout)
    }

    tweenLoop = () => {
        Group.shared.update();
        requestAnimationFrame(this.tweenLoop);
    }
}
