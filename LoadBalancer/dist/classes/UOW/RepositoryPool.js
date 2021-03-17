"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryPool = void 0;
var Repository_1 = require("./Repository");
var Query_1 = require("../Database/Query");
var FullRepository_1 = require("../States/FullRepository");
var RepositoryPool = /** @class */ (function () {
    function RepositoryPool(manager) {
        this.manager = manager;
        this.pool = [];
    }
    //add new repository of server to repository array
    RepositoryPool.prototype.addRepo = function (repo) {
        this.pool.push(repo);
    };
    //add new query in moment when user provide his data
    RepositoryPool.prototype.addToRepo = function (server, q) {
        //for all repositorys exсept chosen
        for (var i = 0; i < this.pool.length; i++) {
            if (this.pool[i].server.name === server.name) {
                continue;
            }
            else {
                try {
                    var nq = new Query_1.Query(q.mail, q.password, this.pool[i].server);
                    this.pool[i].add(nq);
                }
                catch (e) {
                    console.log('pool problem');
                }
            }
        }
        for (var i = 0; i < this.pool.length; i++) {
            if (this.pool[i].server.name === server.name) {
                continue;
            }
            else {
                var arr = this.pool[i].server.manager.repo.getRepoByServer(this.pool[i].server);
                new FullRepository_1.FullRepository(this.pool[i].server, arr).do();
            }
        }
    };
    //returned repository by his server
    RepositoryPool.prototype.getRepoByServer = function (server) {
        var repo;
        for (var _i = 0, _a = this.pool; _i < _a.length; _i++) {
            var r = _a[_i];
            if (r.server.name === server.name) {
                repo = r;
            }
            else {
                continue;
            }
        }
        return repo;
    };
    //initialized repository for every server
    RepositoryPool.prototype.initRepositorys = function () {
        for (var _i = 0, _a = this.manager.servers; _i < _a.length; _i++) {
            var s = _a[_i];
            this.addRepo(new Repository_1.Repository(s));
        }
    };
    return RepositoryPool;
}());
exports.RepositoryPool = RepositoryPool;
