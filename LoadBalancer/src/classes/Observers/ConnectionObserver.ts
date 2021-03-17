import { Connected } from '../States/Connected';
import { Server } from '../Server'
import {Observer} from '../interfaces/Observer'
import {Disconnected} from '../States/Disconnected'
import { UnitOfWork } from '../UOW/UoW';


export class ConnectionObserver implements Observer{
    server: Server;
    name: String = 'Connection Observer';


    constructor(server: Server){
        this.server = server;
        this.server.attach(this)
    }

    update(server:Server){
       const repo = this.server.manager.repo.getRepoByServer(this.server)
       new UnitOfWork(repo,this.server)
            
    }

}