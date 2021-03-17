"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connected = void 0;
var Connected = /** @class */ (function () {
    function Connected(server) {
        this.name = "Connected";
        this.server = server;
    }
    Connected.prototype.do = function (server) {
        //TODO: Check some stuck of data for being to write;
        server.state = this;
        throw new Error("Method not implemented.");
    };
    return Connected;
}());
exports.Connected = Connected;
