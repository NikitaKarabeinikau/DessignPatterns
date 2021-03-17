import { Observer } from '../interfaces/Observer';
import { Subject } from '../interfaces/Subject';
import { Server } from '../Server';
import { Connected } from '../States/Connected';
import { InAction } from '../States/InAtion';
import {RepositoryPool} from '../UOW/RepositoryPool'
import { UnitOfWork } from '../UOW/UoW';

export class RepositoryObserver implements Observer{
    server: Server;
    name = "Repository Observer";

    constructor(s:Server){
        this.server = s;
        this.server.attach(this)
    }
    
    update(sub: Server) {
        const repo = this.server.manager.repo.getRepoByServer(this.server)
        if (this.server.stateOfConnection.constructor.name === new Connected(this.server).constructor.name){
            const s = new InAction(this.server)
            s.do(this.server,this.server.stateOfConnection)
            this.server.setState(s)
        }else{
            console.log("Problem in Repository Obsrever")
        }

    }
}