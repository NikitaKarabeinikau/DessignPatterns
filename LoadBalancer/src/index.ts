import express, { response, Router } from 'express';
import {User} from './classes/Database/User'
import bodyParser from 'body-parser'
import {ServersManager} from './classes/ServersManager'
import {Query} from './classes/Database/Query'
import indexRoutes from './routes/index'
import { Pool } from 'pg';
import { InAction } from './classes/States/InAtion';
import { EmptyRepository } from './classes/States/EmptyRepository';
import { Connected } from './classes/States/Connected';
import { Disconnected } from './classes/States/Disconnected';
import { Server } from './classes/Server';


export const app = express();
export const urlencodeParser = bodyParser.urlencoded({extended: false,});
const manager = new ServersManager;

// const b = new button(manager)

// middlewares 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

const PORT = 5500;

app.use(indexRoutes)


app.post('/', urlencodeParser, (req,res)=> {
    if(!req.body) return res.sendStatus(400)
    const u = new User(req.body.mail,req.body.password)
    const server = manager.chooseServer()
    
    try{
        const qr = new Query(u.mail,u.password,server)
        //Write data to chosen server
        qr.insert(server.pool);
        //Save query to Servers Repository
        manager.repo.addToRepo(server,qr);
    }catch(e){
        console.log("enter problem")
    }
  
    res.status(204).send();
})

//Changing state of 1 server after 15 econds 
// setInterval(manager.servers[0].changeState, 3000)
// setInterval(con,20000)
//  setInterval(stat,2500)
setInterval(watchDog,5000)

// //button changed server state

function con(){
    const ser = manager.servers[0];
    ser.changeState();
}

function stat(){
    const repo = manager.repo
    r();
    for (let s of repo.pool){
        console.log("Database "+s.server.name +" :"+  s.server.stateOfConnection.name+" " + s.server.stateOfRepository.name)
        for(let d of s.querys){
            console.log(d.mail +" "+d.password)
        }
    }
    console.log("------------------------------------\n")
    arrStat();
    console.log("------------------------------------\n")

}

function r(){
    for(let s of manager.servers){
        if (s.stateOfConnection.constructor.name === new InAction(s).constructor.name && s.stateOfRepository.constructor.name === new EmptyRepository(s,s.manager.repo.getRepoByServer(s)).constructor.name){
            s.stateOfConnection = new Connected(s)
        }
    }
}


function arrStat(){
    console.log("Connected : "+manager.connected.length + " Disconnected : "+manager.disconected.length + " InAcion : "+manager.inaction.length)
}

function arrStatName(){
    for (let s of manager.inaction){
        console.log("In Action : " + s.name)
    }
    for (let s of manager.connected){
        console.log("Connected : " + s.name)
    }
    for (let s of manager.disconected){
        console.log("Disconnected : " + s.name)
    }
}

app.listen(PORT);



//New changes 25.03
function watchDog(){
    try{
    const client = manager.chooseServer().pool
    
    client
    .query('SELECT DISTINCT datname FROM pg_stat_activity WHERE datname != \'postgres\'; ')
    .then(rowResp =>{
        let rowData = rowResp.rows;
        let connectedList = []
        for (let s = 0 ; s<rowData.length;s++){
            connectedList.push(rowData[s].datname)
        }

        manager.checkingConnectionByWatchDog(connectedList)
        console.log("----------------------------------------------------------------")
        stat()
        showData()       
    
    })
    }catch(e){  }
}


function showData(){
    const server = manager.chooseServer()
    const password = new Array<String>();
    const mail = new Array<String>();
    try{
        const client = server.pool
        client
        .query('SELECT mail from users;')
        .then(rowResp =>{
            let rowData = rowResp.rows;
            for (let s = 0 ; s<rowData.length;s++){
                mail.push(rowData[s].mail)
                
            }  
        })
    }catch(e){}

    try{
        const client = server.pool
        client
        .query('SELECT password from users;')
        .then(rowResp =>{
            let rowData = rowResp.rows;
            for (let s = 0 ; s<rowData.length;s++){
                password.push(rowData[s].password)
            
            }  
        })
    }catch(e){}
    // manager.showData(server,mail,password)
}
//----------------------------------------------------------------------


console.log('Server on port', PORT,'\n');

