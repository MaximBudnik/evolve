import 'reflect-metadata';
import {Engine} from "./Engine";
import {Container} from "typedi";
import {settings} from "ts-mixer";

const engine = Container.get(Engine)
engine.start()