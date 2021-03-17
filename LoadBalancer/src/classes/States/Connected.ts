import  {Server} from "../Server"
import {State} from '../interfaces/State'
import { InAction } from "./InAtion";
import { initState } from "./initState";
import { Disconnected } from "./Disconnected";
import { FullRepository } from "./FullRepository";

export class Connected implements State{
    name : string;
    server : Server;

    constructor(server:Server){
        this.server = server;
        this.name = "Connected";
        
    }

    do(server:Server,privState:State){
        
        if (privState.constructor.name === new initState(this.server).constructor.name){
            this.addToConnected(this.server);
            this.server.setState(this)
        }
        else if (privState.constructor.name === new InAction(this.server).constructor.name){
            const repo = this.server.manager.repo.getRepoByServer(this.server)
            if(this.server.stateOfRepository.constructor.name === new FullRepository(this.server,repo).constructor.name){
                const a = new InAction(this.server);
                a.do(this.server,privState);
                this.server.notify(this.server.observers[0])
            }else{
                this.removeFromInAction(this.server)
                this.addToConnected(this.server)
                this.server.setState(new Connected(this.server))
            }
            
        }
        else if (privState.constructor.name === new Connected(this.server).constructor.name){
            const repo = this.server.manager.repo.getRepoByServer(this.server)
            if(this.server.stateOfRepository.constructor.name === new FullRepository(this.server,repo).constructor.name){
                const a = new InAction(this.server);
                a.do(this.server,privState);
                this.server.notify(this.server.observers[0])
            }else{
            this.server.setState(this)
            }

        }
        else if (privState.constructor.name === new Disconnected(this.server).constructor.name){
            const repo = this.server.manager.repo.getRepoByServer(this.server)
            if(this.server.stateOfRepository.constructor.name === new FullRepository(this.server,repo).constructor.name){
                const a = new InAction(this.server);
                a.do(this.server,privState);
                this.server.notify(this.server.observers[0])
            }else{
            this.removeFromDisconnected(this.server)
            this.addToConnected(this.server)
            this.server.setState(this)
            }
        }
        else
        {console.log('agasdgfasd')}
    }



    addToConnected(server:Server){
        server.manager.connected.push(server)
    }

    addToInAction(server:Server){
        server.manager.inaction.push(server)
    }

    removeFromDisconnected(server:Server){
        for (let i = 0 ; i<server.manager.disconected.length;i++){
            if (server.manager.disconected[i].name === server.name){
                server.manager.disconected.splice(i,1)
            }else{
                continue;
            }
        }
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

}