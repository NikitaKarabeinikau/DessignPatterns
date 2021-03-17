import {Query} from '../Database/Query'
export interface IRepository{
    querys: Query[];
    add(query:Query):void;
    remove():void;
    get():Query;
    isEmpty():boolean;
}