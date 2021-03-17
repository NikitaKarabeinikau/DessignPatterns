import { Server } from "../Server";
import { Pool } from "pg";

export class Query{

    mail:string;
    password:string;
    server:Server;
    dbpool:Pool;

    constructor(mail:string,password:string,server:Server){
        this.mail = mail;
        this.server = server;
        this.password = password;
        this.dbpool = server.pool;
    }

    insert(pool:Pool){
        try{
        this.dbpool.query('INSERT INTO users VALUES ($1, $2)',[this.mail,this.password])
        }catch(e){
            console.log(e)
        }
    }
}