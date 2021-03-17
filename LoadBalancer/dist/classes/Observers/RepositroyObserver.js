"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryObserver = void 0;
var Connected_1 = require("../States/Connected");
var InAtion_1 = require("../States/InAtion");
var RepositoryObserver = /** @class */ (function () {
    function RepositoryObserver(s) {
        this.name = "Repository Observer";
        this.server = s;
        this.server.attach(this);
    }
    RepositoryObserver.prototype.update = function (sub) {
        var repo = this.server.manager.repo.getRepoByServer(this.server);
        if (this.server.stateOfConnection.constructor.name === new Connected_1.Connected(this.server).constructor.name) {
            var s = new InAtion_1.InAction(this.server);
            s.do(this.server, this.server.stateOfConnection);
            this.server.setState(s);
        }
        else {
            console.log("Problem in Repository Obsrever");
        }
    };
    return RepositoryObserver;
}());
exports.RepositoryObserver = RepositoryObserver;
