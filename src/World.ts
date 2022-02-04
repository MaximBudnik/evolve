import {Inject, Service} from "typedi";
import {EntityRegistry} from "./EntityRegistry";
import {filters, Graphics, Ticker, UPDATE_PRIORITY, utils} from "pixi.js";
import {Colors} from "./colors";
import {getRender, getViewport} from "./utils/getContainers";
import {OrganismGenerator} from "./OrganismGenerator";
import {GodrayFilter} from "@pixi/filter-godray";
import {AlphaFilter} from '@pixi/filter-alpha';
import random from "random";
import {Tween} from "tweedle.js";
import {Engine} from "./Engine";

@Service()
export class World {
    static readonly size = 4000
    private water: Graphics
    private alphaPhilter: AlphaFilter
    private godrayFilter: GodrayFilter
    private time: number = 12
    private timeToLoopRatio = 8

    constructor(
        @Inject()
        private organismGenerator: OrganismGenerator,
        @Inject()
        private entityRegistry: EntityRegistry,
    ) {
    }

    private updateTime = () => {
        this.time++
        if (this.time >= 24) {
            this.time = 0
        }
    }

    private updateWaterFilters = () => {
        if (this.time >= 4 && this.time <= 12) {
            new Tween(this.alphaPhilter).to({alpha: this.alphaPhilter.alpha + 0.05}, Engine.gameLoopTimeout).start();
            // this.godrayFilter.gain += 0.05
        } else if (this.time >= 18 || this.time <= 2) {
            new Tween(this.alphaPhilter).to({alpha: this.alphaPhilter.alpha - 0.05}, Engine.gameLoopTimeout).start();
            // this.godrayFilter.gain -= 0.05
        }
    }

    onGameLoop = (loopCount: number) => {
        this.entityRegistry.onGameLoop()
        if (loopCount % this.timeToLoopRatio === 0) {
            this.updateTime()
            this.updateWaterFilters()
        }
    }

    onRenderLoop = (renderLoopCount: number) => {
        this.godrayFilter.time = renderLoopCount
    }

    init = () => {
        this.drawWater()
        this.organismGenerator.generate()
    }


    private drawWater = () => {
        this.alphaPhilter = new filters.AlphaFilter();
        // this.godrayFilter = new GodrayFilter()
        // this.godrayFilter.gain = 0.5
        // this.godrayFilter.alpha = 0.25

        this.water = getViewport().addChild(new Graphics())
        this.water.filters = [this.alphaPhilter,
            // this.godrayFilter
        ];
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
}