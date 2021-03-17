import { State } from "../interfaces/State";
import { Server } from "../Server";
import { Repository } from "../UOW/Repository";



export class EmptyRepository implements State{
    name: string;
    server:Server;
    repo :Repository;

    constructor(s:Server,repo:Repository){
        this.name = "Empty Repository"
        this.server = s;
        this.repo = repo

    }

    do(server: Server): void {
        this.server.setRepositoryState(this)
    }

}