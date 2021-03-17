"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
var Query = /** @class */ (function () {
    function Query(mail, password, server) {
        this.mail = mail;
        this.server = server;
        this.password = password;
        this.dbpool = server.pool;
    }
    Query.prototype.insert = function (pool) {
        try {
            this.dbpool.query('INSERT INTO users VALUES ($1, $2)', [this.mail, this.password]);
        }
        catch (e) {
            console.log(e);
        }
    };
    return Query;
}());
exports.Query = Query;
