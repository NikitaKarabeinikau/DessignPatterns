import {State} from '../interfaces/State'
import { Server } from '../Server';
import { Repository } from '../UOW/Repository';
import { Connected } from './Connected';
import { Disconnected } from './Disconnected';
import { EmptyRepository } from './EmptyRepository';
import { InAction } from './InAtion';

export class FullRepository implements State{
    name: string;
    server:Server;
    repo:Repository;

    constructor(s:Server,repo:Repository){
        this.name = "Full Repository";
        this.server = s;
        this.repo = repo;
    }

    do(): void {        
        this.server.setRepositoryState(this)
        if (this.server.stateOfConnection.constructor.name === new Connected(this.server).constructor.name){
            this.server.notify(this.server.observers[1])
        }
        
    }

}