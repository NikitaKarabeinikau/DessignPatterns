import {Server} from './Server'
import { Connected } from './States/Connected';
import { Disconnected } from './States/Disconnected';
import { FullRepository } from './States/FullRepository';
import { InAction } from './States/InAtion';
import { RepositoryPool } from './UOW/RepositoryPool';


export class ServersManager{
    //
    servers: Array<Server>;
    counter: number;
    repo: RepositoryPool;
    connected: Server[];
    disconected:Server[];
    inaction:Server[];


    constructor(){
        this.massageInit();
        this.servers = Array<Server>(); //array server
        this.repo = new RepositoryPool(this);
        this.connected = [];
        this.disconected = [];
        this.inaction = [];
        this.counter = 0;
        this.initServers();
            }

    getServerByName(name:string):Server{
        let server:Server;
        for (let s of this.servers){
            if (s.name === name)[
                server = s
            ]
        }
        return server!;
    }

    checkingConnectionByWatchDog(connectedList:[]){
        let chacked = []
        for (let i = 0 ; i<connectedList.length;i++){
            const server = this.getServerByName(connectedList[i])
            if(server.stateOfRepository.constructor.name === new FullRepository(server,server.manager.repo.getRepoByServer(server)).constructor.name){
                    new InAction(server).do(server,server.stateOfConnection)
            }else{
                new Connected(server).do(server,server.stateOfConnection)
                server.checkRepo();
                chacked.push(server)
            }
        }
        
        if (chacked.length<this.connected.length){
            for(let j = 0 ; j<this.connected.length;j++){
                for(let jj =0 ;jj<chacked.length;jj++){
                    if(this.connected[j].name === chacked[jj].name){
                        break;
                    }else if (this.connected[j].name !== chacked[jj].name && jj===chacked.length-1){
                        new Disconnected(this.connected[j]).do(this.connected[j],this.connected[j].stateOfConnection)
                    }
                }
                
            }
        }this.connected = chacked
    }

    massageInit() {
        console.log("Server Manager Initilized")
    }

    //Iteracyjny wybór servera
    chooseServer():Server{
        //if counter is bigger than servers array than counter = 0 else counter++
            if (this.counter+1 > this.connected.length){
                this.counter = 0
            }else {
                this.counter = this.counter + 1
            }        
        return this.connected[this.counter]
    }

    setNewServer(s: Server){
        this.servers.push(s);
    }

    //inicializacja serverow
    initServers(){
        this.setNewServer(new Server("ld1",this))
        this.setNewServer(new Server("ld2",this))
        this.setNewServer(new Server("ld3",this))
        this.setNewServer(new Server("ld0",this))
        this.setNewServer(new Server("ld4",this))
        this.clearData();
        this.repo.initRepositorys();
    }

    //when app is initilized clear all data from databases
    clearData(){
        for(let s of this.servers){
            s.pool.query("DELETE FROM users");
        }
    }

    showData(server:Server,mail:Array<String>,password:Array<String>){
        console.log(server.name)
        console.log("Mail " + " Password")
        for (let i = 0 ; i<mail.length;i++){
            console.log(mail[i] + " "+ password[i])
        }
    }
}