import { Repository } from "../UOW/Repository";

export interface IUnitOfWork{
    start():void;
    complete():void;
    getRepository():Repository;
}