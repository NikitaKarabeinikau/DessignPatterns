"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionObserver = void 0;
var Connected_1 = require("./Connected");
var Observer_1 = require("./Observer");
var Disconnected_1 = require("./Disconnected");
var ConnectionObserver = /** @class */ (function (_super) {
    __extends(ConnectionObserver, _super);
    function ConnectionObserver(sub, connection) {
        var _this = _super.call(this, "Server") || this;
        _this.name = 'ConnectionObserver';
        _this.subject = sub;
        _this.connection = connection;
        return _this;
        //checking of Server State
        // setInterval(this.update, 1000)
    }
    ConnectionObserver.prototype.checkConnection = function () {
        return this.connection;
    };
    ConnectionObserver.prototype.update = function () {
        this.connection = !this.connection;
        if (this.connection === false) {
            this.subject.state = new Disconnected_1.Disconnected();
        }
        if (this.connection === true) {
            this.subject.state = new Connected_1.Connected(this.subject);
        }
    };
    return ConnectionObserver;
}(Observer_1.Observer));
exports.ConnectionObserver = ConnectionObserver;
