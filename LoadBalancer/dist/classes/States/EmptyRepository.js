"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyRepository = void 0;
var EmptyRepository = /** @class */ (function () {
    function EmptyRepository(s, repo) {
        this.name = "Empty Repository";
        this.server = s;
        this.repo = repo;
    }
    EmptyRepository.prototype.do = function (server) {
        this.server.setRepositoryState(this);
    };
    return EmptyRepository;
}());
exports.EmptyRepository = EmptyRepository;
