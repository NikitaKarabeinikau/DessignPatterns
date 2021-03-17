"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullRepository = void 0;
var Connected_1 = require("./Connected");
var FullRepository = /** @class */ (function () {
    function FullRepository(s, repo) {
        this.name = "Full Repository";
        this.server = s;
        this.repo = repo;
    }
    FullRepository.prototype.do = function () {
        this.server.setRepositoryState(this);
        if (this.server.stateOfConnection.constructor.name === new Connected_1.Connected(this.server).constructor.name) {
            this.server.notify(this.server.observers[1]);
        }
    };
    return FullRepository;
}());
exports.FullRepository = FullRepository;
