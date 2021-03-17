"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initState = void 0;
var Connected_1 = require("./Connected");
var initState = /** @class */ (function () {
    function initState(server) {
        this.name = "Init State";
        this.server = server;
        this.privState = this;
    }
    initState.prototype.do = function (server) {
        this.server.stateOfConnection = new Connected_1.Connected(this.server);
        new Connected_1.Connected(this.server).do(this.server, this);
    };
    initState.prototype.printStates = function () {
        var _a;
        console.log(this.privState.constructor.name + " => " + ((_a = this.server.stateOfConnection) === null || _a === void 0 ? void 0 : _a.constructor.name));
    };
    return initState;
}());
exports.initState = initState;
