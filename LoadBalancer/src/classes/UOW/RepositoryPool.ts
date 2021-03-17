import {Repository} from "./Repository"
import {Query} from "../Database/Query"
import {ServersManager} from "../ServersManager"
import {Server} from "../Server"
import { FullRepository } from "../States/FullRepository";

export class RepositoryPool{
    pool: Repository[];
    manager: ServersManager;
    constructor(manager:ServersManager){
        this.manager = manager;
        this.pool = [];
        
    }
    
    //add new repository of server to repository array
    addRepo(repo:Repository){
        this.pool.push(repo)
    }

    //add new query in moment when user provide his data
    addToRepo(server:Server,q:Query){ 
        //for all repositorys exсept chosen
        for(var i =0; i<this.pool.length;i++){
            if (this.pool[i].server.name === server.name){
                continue;
            }
            else{
                try{
                const nq = new Query(q.mail,q.password,this.pool[i].server)
                this.pool[i].add(nq);
                }catch(e){
                    console.log('pool problem')
                }
                
            }
        }

        for(var i =0; i<this.pool.length;i++){
            if (this.pool[i].server.name === server.name){
                continue;
            }
            else{
                const arr = this.pool[i].server.manager.repo.getRepoByServer(this.pool[i].server)
                new FullRepository(this.pool[i].server,arr).do()
            }
        }
    }
    //returned repository by his server
    getRepoByServer(server:Server):Repository{
        let repo:Repository;
        for (let r of this.pool){
            if (r.server.name === server.name){
                repo = r;
            }else{
                continue;
            }
        }
        return repo!;
    }
    //initialized repository for every server
    initRepositorys(){
        for (let s of this.manager.servers){
            this.addRepo(new Repository(s))
        }
    }
}