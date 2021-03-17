import {Query} from '../Database/Query'
import { IRepository } from '../interfaces/IRepository';
import { Server } from '../Server';

export class Repository implements IRepository{
    name:string;
    public querys: Query[];
    server:Server;

    constructor(db:Server){
        this.server = db;
        this.querys = [];
        this.name = ("Repository of server : " + this.server.name)
    }

    
    add(q:Query){
        this.querys.push(q);
    }
    remove(){
        this.querys.shift();
    }
    get():Query{
        let val = this.querys[0]
        return val
        
    }

    isEmpty():boolean{
        if (this.querys.length === 0){
            return true
        }else{
            return false
        }
    }
    
}