"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
var EmptyRepository_1 = require("../States/EmptyRepository");
var Connected_1 = require("../States/Connected");
var UnitOfWork = /** @class */ (function () {
    function UnitOfWork(r, s) {
        this.server = s;
        this.repo = r;
        this.start();
    }
    //send data to Server while Repository not Empty
    UnitOfWork.prototype.start = function () {
        while (this.repo.querys.length !== 0) {
            this.action();
        }
        //when Repository is empty change state to Connect 
        this.complete();
    };
    UnitOfWork.prototype.complete = function () {
        //Change State of Server to Connected 
        new EmptyRepository_1.EmptyRepository(this.server, this.repo).do(this.server);
        var s = new Connected_1.Connected(this.server);
        s.do(this.server, this.server.stateOfConnection);
    };
    UnitOfWork.prototype.getRepository = function () {
        return this.server.manager.repo.getRepoByServer(this.server);
    };
    UnitOfWork.prototype.action = function () {
        var q = this.repo.get();
        try {
            q.insert(this.server.pool);
        }
        catch (e) {
            console.log(e);
        }
        this.repo.remove();
    };
    return UnitOfWork;
}());
exports.UnitOfWork = UnitOfWork;
