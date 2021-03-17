import {Server} from "../Server"

export interface State{
    name:string;
    do(server:Server,privState:State):void;
}