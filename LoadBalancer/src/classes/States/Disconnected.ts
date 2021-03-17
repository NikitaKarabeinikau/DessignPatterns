import  {Server} from "../Server"
import {State} from '../interfaces/State'
import { initState } from "./initState";
import { Connected } from "./Connected";
import { InAction } from "./InAtion";

export class Disconnected implements State{
    name : string;
    server:Server;

    constructor(server:Server){
        this.name = "Disconnected";
        this.server = server;
    }

    do(server:Server,privState:State){
        if (privState.constructor.name === new initState(this.server).constructor.name){
        this.addToDisconnected(this.server)
        this.server.setState(this)

        }
        else if (privState.constructor.name === new Connected(this.server).constructor.name){
            this.removeFromConnected(this.server)
            this.addToDisconnected(this.server)
            this.server.setState(this)

        }
        else if (privState.constructor.name === new Disconnected(this.server).constructor.name){
            console.log("err: from disconected to disconnected")
        }
        else if (privState.constructor.name === new InAction(this.server).constructor.name){
            this.removeFromInAction(this.server)
            this.addToDisconnected(this.server)
            this.server.setState(this)
        }
    }

    printStates(privState:State){
        console.log(privState.constructor.name + " => " + this.server.stateOfConnection?.constructor.name)
    }

    removeFromInAction(server:Server){
        for (let i = 0 ; i<server.manager.inaction.length;i++){
            if (server.manager.inaction[i].name === server.name){
                server.manager.inaction.splice(i,1)
            }else{
                continue;
            }
        }
    }

    removeFromConnected(server:Server){
        for (let i = 0 ; i<server.manager.connected.length;i++){
            if (server.manager.connected[i].name === server.name){
                server.manager.connected.splice(i,1)
            }else{
                continue;
            }
        }
    }

    addToDisconnected(server:Server){
        server.manager.disconected.push(server)
    }
}