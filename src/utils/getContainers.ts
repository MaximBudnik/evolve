import {Container} from "typedi";
import {Viewport} from "pixi-viewport";
import {ContainerKeys} from "./ContainerKeys";
import {Application} from "pixi.js";

export const getViewport = () => Container.get<Viewport>(ContainerKeys.viewport);

export const getRender = () => Container.get<Application>(ContainerKeys.render);
