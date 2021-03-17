"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionObserver = void 0;
var UoW_1 = require("../UOW/UoW");
var ConnectionObserver = /** @class */ (function () {
    function ConnectionObserver(server) {
        this.name = 'Connection Observer';
        this.server = server;
        this.server.attach(this);
    }
    ConnectionObserver.prototype.update = function (server) {
        var repo = this.server.manager.repo.getRepoByServer(this.server);
        new UoW_1.UnitOfWork(repo, this.server);
    };
    return ConnectionObserver;
}());
exports.ConnectionObserver = ConnectionObserver;
