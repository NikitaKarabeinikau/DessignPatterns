import { State } from "../interfaces/State";
import { Server } from "../Server";
import { Connected } from "./Connected";
import { Disconnected } from "./Disconnected";

export class initState implements State{
    name: string;
    server:Server;
    privState: State;

    constructor(server:Server){
        this.name = "Init State"
        this.server = server;
        this.privState = this;
    }
    
    do(server: Server) {
        this.server.stateOfConnection = new Connected(this.server);
        new Connected(this.server).do(this.server,this)
    }
    
    printStates(){
        console.log(this.privState.constructor.name + " => " + this.server.stateOfConnection?.constructor.name)
    }
    

}