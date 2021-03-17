import { State } from "../interfaces/State";
import { Server } from "../Server";
import { Connected } from "./Connected";
import { Disconnected } from "./Disconnected";
import { EmptyRepository } from "./EmptyRepository";
import { initState } from "./initState";

export class InAction implements State{
    name: string;
    server:Server;

    constructor(server:Server){
        this.name = "In Action";
        this.server = server;


    }

    re():boolean{
        if (this.server.stateOfRepository.constructor.name === new EmptyRepository(this.server, this.server.manager.repo.getRepoByServer(this.server)).constructor.name){
            return false
        }else {return true}
    }
    
    do(server:Server,privState:State): void {
        if (privState.constructor.name === new Disconnected(this.server).constructor.name){
            this.addToInAction(this.server)
            this.removeFromInDisconnected(this.server)
            this.server.setState(this)
            this.server.notify(this.server.observers[0])
        }

        else if (privState.constructor.name === new InAction(this.server).constructor.name){
            this.server.notify(this.server.observers[0])
        
        }

        else if (privState.constructor.name === new Connected(this.server).constructor.name){
            this.addToInAction(this.server)
            this.removeFromConnected(this.server)
            this.server.setState(this)
            this.server.notify(this.server.observers[0])
            
        }
        else if (privState.constructor.name === new initState(this.server).constructor.name){
            this.addToInAction(this.server)
            this.server.setState(this)
        }
        else{console.log("problem in Action state ")}
    }

    removeFromInDisconnected(server:Server){
        for (let i = 0 ; i<server.manager.disconected.length;i++){
            if (server.manager.disconected[i].name === server.name){
                server.manager.disconected.splice(i,1)
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

    addToInAction(server:Server){
        server.manager.inaction.push(server)
    }

    }
    
