"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connected = void 0;
var InAtion_1 = require("./InAtion");
var initState_1 = require("./initState");
var Disconnected_1 = require("./Disconnected");
var FullRepository_1 = require("./FullRepository");
var Connected = /** @class */ (function () {
    function Connected(server) {
        this.server = server;
        this.name = "Connected";
    }
    Connected.prototype.do = function (server, privState) {
        if (privState.constructor.name === new initState_1.initState(this.server).constructor.name) {
            this.addToConnected(this.server);
            this.server.setState(this);
        }
        else if (privState.constructor.name === new InAtion_1.InAction(this.server).constructor.name) {
            var repo = this.server.manager.repo.getRepoByServer(this.server);
            if (this.server.stateOfRepository.constructor.name === new FullRepository_1.FullRepository(this.server, repo).constructor.name) {
                var a = new InAtion_1.InAction(this.server);
                a.do(this.server, privState);
                this.server.notify(this.server.observers[0]);
            }
            else {
                this.removeFromInAction(this.server);
                this.addToConnected(this.server);
                this.server.setState(new Connected(this.server));
            }
        }
        else if (privState.constructor.name === new Connected(this.server).constructor.name) {
            var repo = this.server.manager.repo.getRepoByServer(this.server);
            if (this.server.stateOfRepository.constructor.name === new FullRepository_1.FullRepository(this.server, repo).constructor.name) {
                var a = new InAtion_1.InAction(this.server);
                a.do(this.server, privState);
                this.server.notify(this.server.observers[0]);
            }
            else {
                this.server.setState(this);
            }
        }
        else if (privState.constructor.name === new Disconnected_1.Disconnected(this.server).constructor.name) {
            var repo = this.server.manager.repo.getRepoByServer(this.server);
            if (this.server.stateOfRepository.constructor.name === new FullRepository_1.FullRepository(this.server, repo).constructor.name) {
                var a = new InAtion_1.InAction(this.server);
                a.do(this.server, privState);
                this.server.notify(this.server.observers[0]);
            }
            else {
                this.removeFromDisconnected(this.server);
                this.addToConnected(this.server);
                this.server.setState(this);
            }
        }
        else {
            console.log('agasdgfasd');
        }
    };
    Connected.prototype.addToConnected = function (server) {
        server.manager.connected.push(server);
    };
    Connected.prototype.addToInAction = function (server) {
        server.manager.inaction.push(server);
    };
    Connected.prototype.removeFromDisconnected = function (server) {
        for (var i = 0; i < server.manager.disconected.length; i++) {
            if (server.manager.disconected[i].name === server.name) {
                server.manager.disconected.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    Connected.prototype.removeFromInAction = function (server) {
        for (var i = 0; i < server.manager.inaction.length; i++) {
            if (server.manager.inaction[i].name === server.name) {
                server.manager.inaction.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    return Connected;
}());
exports.Connected = Connected;
