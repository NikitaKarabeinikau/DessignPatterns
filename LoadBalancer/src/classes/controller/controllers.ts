import { ServersManager } from '../ServersManager';
import { QueryResult } from 'pg';
import {Request,Response} from 'express'
import { Server } from '../Server';

const manager = new ServersManager()

export const getMail = async (req:Request, res:Response): Promise<Response>=>{
    try{
        const server = manager.chooseServer()
        const response : QueryResult = await server.pool.query('SELECT mail FROM users;');
        console.log(server.name);
        return res.status(200).json(response.rows);
    }catch(e){
        console.log(e)
        return res.status(500).json('Internal Server error')
    }
}

export const getMailbyID = async (req:Request, res:Response): Promise<Response>=>{
    try{
        const id = parseInt(req.params.id)
        const server = manager.servers[id]
        const response : QueryResult = await server.pool.query('SELECT mail FROM users;');
        return res.status(200).json(response.rows);
    }catch(e){
        console.log(e)
        return res.status(500).json('Internal Server error')
    }
}

// export const createData = async (req:Request, res:Response): Promise<Response>=>{
//     try{
//         const server = manager.chooseServer()
//         const {mail, password} = req.body;
//         const response : QueryResult = await server.pool.query('INSERT INTO users (mail, password) VALUES ($1, $2)', [mail,password]);
//         return res.json({
//             message: "Mail added",
//             body:{
//                 mail,
//                 password
//             }
//         })
// }