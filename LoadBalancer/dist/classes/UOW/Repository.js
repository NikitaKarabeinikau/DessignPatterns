"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var Repository = /** @class */ (function () {
    function Repository(db) {
        this.server = db;
        this.querys = [];
        this.name = ("Repository of server : " + this.server.name);
    }
    Repository.prototype.add = function (q) {
        this.querys.push(q);
    };
    Repository.prototype.remove = function () {
        this.querys.shift();
    };
    Repository.prototype.get = function () {
        var val = this.querys[0];
        return val;
    };
    Repository.prototype.isEmpty = function () {
        if (this.querys.length === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    return Repository;
}());
exports.Repository = Repository;
