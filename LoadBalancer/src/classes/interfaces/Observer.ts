import { Server } from '../Server';
import {Subject} from './Subject'

export interface Observer{
    name:String;
    server:Server;
    update(sub:Subject): void;
}