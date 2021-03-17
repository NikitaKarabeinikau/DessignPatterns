"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAction = void 0;
var Connected_1 = require("./Connected");
var Disconnected_1 = require("./Disconnected");
var EmptyRepository_1 = require("./EmptyRepository");
var initState_1 = require("./initState");
var InAction = /** @class */ (function () {
    function InAction(server) {
        this.name = "In Action";
        this.server = server;
    }
    InAction.prototype.re = function () {
        if (this.server.stateOfRepository.constructor.name === new EmptyRepository_1.EmptyRepository(this.server, this.server.manager.repo.getRepoByServer(this.server)).constructor.name) {
            return false;
        }
        else {
            return true;
        }
    };
    InAction.prototype.do = function (server, privState) {
        if (privState.constructor.name === new Disconnected_1.Disconnected(this.server).constructor.name) {
            this.addToInAction(this.server);
            this.removeFromInDisconnected(this.server);
            this.server.setState(this);
            this.server.notify(this.server.observers[0]);
        }
        else if (privState.constructor.name === new InAction(this.server).constructor.name) {
            this.server.notify(this.server.observers[0]);
        }
        else if (privState.constructor.name === new Connected_1.Connected(this.server).constructor.name) {
            this.addToInAction(this.server);
            this.removeFromConnected(this.server);
            this.server.setState(this);
            this.server.notify(this.server.observers[0]);
        }
        else if (privState.constructor.name === new initState_1.initState(this.server).constructor.name) {
            this.addToInAction(this.server);
            this.server.setState(this);
        }
        else {
            console.log("problem in Action state ");
        }
    };
    InAction.prototype.removeFromInDisconnected = function (server) {
        for (var i = 0; i < server.manager.disconected.length; i++) {
            if (server.manager.disconected[i].name === server.name) {
                server.manager.disconected.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    InAction.prototype.removeFromConnected = function (server) {
        for (var i = 0; i < server.manager.connected.length; i++) {
            if (server.manager.connected[i].name === server.name) {
                server.manager.connected.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    InAction.prototype.addToInAction = function (server) {
        server.manager.inaction.push(server);
    };
    return InAction;
}());
exports.InAction = InAction;
