"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var pg_1 = require("pg");
var ConnectionObserver_1 = require("./Observers/ConnectionObserver");
var Connected_1 = require("./States/Connected");
var Disconnected_1 = require("./States/Disconnected");
var RepositroyObserver_1 = require("./Observers/RepositroyObserver");
var EmptyRepository_1 = require("./States/EmptyRepository");
var initState_1 = require("./States/initState");
var FullRepository_1 = require("./States/FullRepository");
var Server = /** @class */ (function () {
    function Server(name, manager) {
        this.observers = [];
        this.name = name;
        this.manager = manager;
        this.stateOfConnection = new initState_1.initState(this);
        this.repo = this.manager.repo.getRepoByServer(this);
        this.stateOfRepository = new EmptyRepository_1.EmptyRepository(this, this.repo);
        var init = new initState_1.initState(this);
        new ConnectionObserver_1.ConnectionObserver(this);
        new RepositroyObserver_1.RepositoryObserver(this);
        init.do(this);
        // dodaje obserwującego
        this.pool = new pg_1.Pool({ user: 'postgres', host: 'localhost', password: '', database: this.name });
        //setInterval(this.messageCurrentState, 10000)
    }
    Server.prototype.notify = function (obs) {
        obs.update(this);
    };
    Server.prototype.checkRepo = function () {
        if (this.manager.repo.getRepoByServer(this).querys.length !== 0) {
            new FullRepository_1.FullRepository(this, this.manager.repo.getRepoByServer(this));
        }
    };
    Server.prototype.attach = function (obs) {
        this.observers.push(obs);
    };
    //When set state of Server -> notifyAll Observers
    Server.prototype.setState = function (state) {
        this.stateOfConnection = state;
    };
    Server.prototype.setStateByServer = function (state) {
        state.do(this, this.stateOfConnection);
    };
    Server.prototype.setRepositoryState = function (state) {
        this.stateOfRepository = state;
    };
    Server.prototype.getState = function () {
        return this.stateOfConnection;
    };
    Server.prototype.changeState = function () {
        if ((this.stateOfConnection.constructor.name) !== (new Disconnected_1.Disconnected(this).constructor.name)) {
            this.stateOfConnection = new Disconnected_1.Disconnected(this);
            new Disconnected_1.Disconnected(this).do(this, new Connected_1.Connected(this));
        }
        else {
            this.stateOfConnection = new Connected_1.Connected(this);
            new Connected_1.Connected(this).do(this, new Disconnected_1.Disconnected(this));
        }
    };
    return Server;
}());
exports.Server = Server;
