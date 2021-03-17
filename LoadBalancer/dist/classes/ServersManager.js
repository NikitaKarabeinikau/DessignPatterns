"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersManager = void 0;
var Server_1 = require("./Server");
var Connected_1 = require("./States/Connected");
var Disconnected_1 = require("./States/Disconnected");
var FullRepository_1 = require("./States/FullRepository");
var InAtion_1 = require("./States/InAtion");
var RepositoryPool_1 = require("./UOW/RepositoryPool");
var ServersManager = /** @class */ (function () {
    function ServersManager() {
        this.massageInit();
        this.servers = Array(); //array server
        this.repo = new RepositoryPool_1.RepositoryPool(this);
        this.connected = [];
        this.disconected = [];
        this.inaction = [];
        this.counter = 0;
        this.initServers();
    }
    ServersManager.prototype.getServerByName = function (name) {
        var server;
        for (var _i = 0, _a = this.servers; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s.name === name)
                [
                    server = s
                ];
        }
        return server;
    };
    ServersManager.prototype.checkingConnectionByWatchDog = function (connectedList) {
        var chacked = [];
        for (var i = 0; i < connectedList.length; i++) {
            var server = this.getServerByName(connectedList[i]);
            if (server.stateOfRepository.constructor.name === new FullRepository_1.FullRepository(server, server.manager.repo.getRepoByServer(server)).constructor.name) {
                new InAtion_1.InAction(server).do(server, server.stateOfConnection);
            }
            else {
                new Connected_1.Connected(server).do(server, server.stateOfConnection);
                server.checkRepo();
                chacked.push(server);
            }
        }
        if (chacked.length < this.connected.length) {
            for (var j = 0; j < this.connected.length; j++) {
                for (var jj = 0; jj < chacked.length; jj++) {
                    if (this.connected[j].name === chacked[jj].name) {
                        break;
                    }
                    else if (this.connected[j].name !== chacked[jj].name && jj === chacked.length - 1) {
                        new Disconnected_1.Disconnected(this.connected[j]).do(this.connected[j], this.connected[j].stateOfConnection);
                    }
                }
            }
        }
        this.connected = chacked;
    };
    ServersManager.prototype.massageInit = function () {
        console.log("Server Manager Initilized");
    };
    //Iteracyjny wybór servera
    ServersManager.prototype.chooseServer = function () {
        //if counter is bigger than servers array than counter = 0 else counter++
        if (this.counter + 1 > this.connected.length) {
            this.counter = 0;
        }
        else {
            this.counter = this.counter + 1;
        }
        return this.connected[this.counter];
    };
    ServersManager.prototype.setNewServer = function (s) {
        this.servers.push(s);
    };
    //inicializacja serverow
    ServersManager.prototype.initServers = function () {
        this.setNewServer(new Server_1.Server("ld1", this));
        this.setNewServer(new Server_1.Server("ld2", this));
        this.setNewServer(new Server_1.Server("ld3", this));
        this.setNewServer(new Server_1.Server("ld0", this));
        this.setNewServer(new Server_1.Server("ld4", this));
        this.clearData();
        this.repo.initRepositorys();
    };
    //when app is initilized clear all data from databases
    ServersManager.prototype.clearData = function () {
        for (var _i = 0, _a = this.servers; _i < _a.length; _i++) {
            var s = _a[_i];
            s.pool.query("DELETE FROM users");
        }
    };
    ServersManager.prototype.showData = function (server, mail, password) {
        console.log(server.name);
        console.log("Mail " + " Password");
        for (var i = 0; i < mail.length; i++) {
            console.log(mail[i] + " " + password[i]);
        }
    };
    return ServersManager;
}());
exports.ServersManager = ServersManager;
