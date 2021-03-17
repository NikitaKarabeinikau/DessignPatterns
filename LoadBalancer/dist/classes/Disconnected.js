"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disconnected = void 0;
var Disconnected = /** @class */ (function () {
    function Disconnected() {
        this.name = "Connected";
    }
    Disconnected.prototype.do = function (server) {
        //TODO: Check some stuck of data for being to write;
        server.state = this;
        throw new Error("Method not implemented.");
    };
    return Disconnected;
}());
exports.Disconnected = Disconnected;
