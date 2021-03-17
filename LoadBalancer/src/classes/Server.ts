import { Pool } from 'pg';
import { ConnectionObserver } from './Observers/ConnectionObserver'
import {Connected} from './States/Connected'
import {State} from './interfaces/State'
import { Disconnected } from './States/Disconnected';
import { Subject } from './interfaces/Subject';
import {Observer} from './interfaces/Observer'
import { Repository } from './UOW/Repository';
import { RepositoryObserver } from './Observers/RepositroyObserver';
import { ServersManager } from './ServersManager';
import {EmptyRepository} from './States/EmptyRepository'
import { initState } from './States/initState';
import { FullRepository } from './States/FullRepository';



export class Server implements Subject{
    name: string;
    stateOfConnection:State;
    stateOfRepository: State;
    observers: Observer[] = [];
    pool : Pool;
    manager:ServersManager;
    repo:Repository;

    
    

    constructor(name:string,manager:ServersManager){
        this.name = name;
        this.manager = manager;
        this.stateOfConnection = new initState(this);
        this.repo = this.manager.repo.getRepoByServer(this)
        this.stateOfRepository = new EmptyRepository(this,this.repo);
        const init = new initState(this)
        new ConnectionObserver(this)
        new RepositoryObserver(this)
        init.do(this);

        
        // dodaje obserwującego

        this.pool = new Pool({user:'postgres',host:'localhost',password:'',database:this.name})
        
        //setInterval(this.messageCurrentState, 10000)
    }

    notify(obs:Observer) {
            obs.update(this);
    }

    checkRepo(){
        if (this.manager.repo.getRepoByServer(this).querys.length !== 0){
            new FullRepository(this,this.manager.repo.getRepoByServer(this))
        }
    }

    attach(obs: Observer){
        this.observers.push(obs);
    }

    //When set state of Server -> notifyAll Observers
    setState(state: State){
        this.stateOfConnection = state;
    }

    setStateByServer(state:State){
        state.do(this,this.stateOfConnection)
    }
    setRepositoryState(state: State){
        this.stateOfRepository = state;
    }

    getState():State{
        return this.stateOfConnection 
    }

   


    changeState(){
        if ((this.stateOfConnection.constructor.name) !== (new Disconnected(this).constructor.name)){
            this.stateOfConnection = new Disconnected(this);
            new Disconnected(this).do(this,new Connected(this))
        }else{
            this.stateOfConnection = new Connected(this);
            new Connected(this).do(this,new Disconnected(this))
        }
        
    }
   

}