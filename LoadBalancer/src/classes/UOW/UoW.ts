import { IUnitOfWork } from "../interfaces/IUnitOfWork";
import { Server } from "../Server";
import { Repository } from "./Repository";

import { EmptyRepository } from "../States/EmptyRepository";
import { Connected } from "../States/Connected";


export class UnitOfWork implements IUnitOfWork{
    repo: Repository;
    server:Server;

    constructor(r:Repository,s:Server){
        this.server = s;
        this.repo = r;
        this.start();
    }

    //send data to Server while Repository not Empty
    start(): void {
            while(this.repo.querys.length !== 0){
                this.action();
            }       
        //when Repository is empty change state to Connect 
        this.complete();
    }

    complete(): void {
        //Change State of Server to Connected 
        new EmptyRepository(this.server,this.repo).do(this.server)
        const s = new Connected(this.server)
        s.do(this.server,this.server.stateOfConnection)
       
    }

    getRepository(): Repository {
        return this.server.manager.repo.getRepoByServer(this.server)
    }
    
    action(){
        const q = this.repo.get();
        try{
            q.insert(this.server.pool);
        }catch(e){
            console.log(e)
        }
        this.repo.remove()
    }

}