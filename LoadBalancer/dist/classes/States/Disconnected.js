"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disconnected = void 0;
var initState_1 = require("./initState");
var Connected_1 = require("./Connected");
var InAtion_1 = require("./InAtion");
var Disconnected = /** @class */ (function () {
    function Disconnected(server) {
        this.name = "Disconnected";
        this.server = server;
    }
    Disconnected.prototype.do = function (server, privState) {
        if (privState.constructor.name === new initState_1.initState(this.server).constructor.name) {
            this.addToDisconnected(this.server);
            this.server.setState(this);
        }
        else if (privState.constructor.name === new Connected_1.Connected(this.server).constructor.name) {
            this.removeFromConnected(this.server);
            this.addToDisconnected(this.server);
            this.server.setState(this);
        }
        else if (privState.constructor.name === new Disconnected(this.server).constructor.name) {
            console.log("err: from disconected to disconnected");
        }
        else if (privState.constructor.name === new InAtion_1.InAction(this.server).constructor.name) {
            this.removeFromInAction(this.server);
            this.addToDisconnected(this.server);
            this.server.setState(this);
        }
    };
    Disconnected.prototype.printStates = function (privState) {
        var _a;
        console.log(privState.constructor.name + " => " + ((_a = this.server.stateOfConnection) === null || _a === void 0 ? void 0 : _a.constructor.name));
    };
    Disconnected.prototype.removeFromInAction = function (server) {
        for (var i = 0; i < server.manager.inaction.length; i++) {
            if (server.manager.inaction[i].name === server.name) {
                server.manager.inaction.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    Disconnected.prototype.removeFromConnected = function (server) {
        for (var i = 0; i < server.manager.connected.length; i++) {
            if (server.manager.connected[i].name === server.name) {
                server.manager.connected.splice(i, 1);
            }
            else {
                continue;
            }
        }
    };
    Disconnected.prototype.addToDisconnected = function (server) {
        server.manager.disconected.push(server);
    };
    return Disconnected;
}());
exports.Disconnected = Disconnected;
