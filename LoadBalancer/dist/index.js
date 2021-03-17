"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlencodeParser = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var User_1 = require("./classes/Database/User");
var body_parser_1 = __importDefault(require("body-parser"));
var ServersManager_1 = require("./classes/ServersManager");
var Query_1 = require("./classes/Database/Query");
var index_1 = __importDefault(require("./routes/index"));
var InAtion_1 = require("./classes/States/InAtion");
var EmptyRepository_1 = require("./classes/States/EmptyRepository");
var Connected_1 = require("./classes/States/Connected");
exports.app = express_1.default();
exports.urlencodeParser = body_parser_1.default.urlencoded({ extended: false, });
var manager = new ServersManager_1.ServersManager;
// const b = new button(manager)
// middlewares 
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(body_parser_1.default.json());
var PORT = 5500;
exports.app.use(index_1.default);
exports.app.post('/', exports.urlencodeParser, function (req, res) {
    if (!req.body)
        return res.sendStatus(400);
    var u = new User_1.User(req.body.mail, req.body.password);
    var server = manager.chooseServer();
    try {
        var qr = new Query_1.Query(u.mail, u.password, server);
        //Write data to chosen server
        qr.insert(server.pool);
        //Save query to Servers Repository
        manager.repo.addToRepo(server, qr);
    }
    catch (e) {
        console.log("enter problem");
    }
    res.status(204).send();
});
//Changing state of 1 server after 15 econds 
// setInterval(manager.servers[0].changeState, 3000)
// setInterval(con,20000)
//  setInterval(stat,2500)
setInterval(watchDog, 5000);
// //button changed server state
function con() {
    var ser = manager.servers[0];
    ser.changeState();
}
function stat() {
    var repo = manager.repo;
    r();
    for (var _i = 0, _a = repo.pool; _i < _a.length; _i++) {
        var s = _a[_i];
        console.log("Database " + s.server.name + " :" + s.server.stateOfConnection.name + " " + s.server.stateOfRepository.name);
        for (var _b = 0, _c = s.querys; _b < _c.length; _b++) {
            var d = _c[_b];
            console.log(d.mail + " " + d.password);
        }
    }
    console.log("------------------------------------\n");
    arrStat();
    console.log("------------------------------------\n");
}
function r() {
    for (var _i = 0, _a = manager.servers; _i < _a.length; _i++) {
        var s = _a[_i];
        if (s.stateOfConnection.constructor.name === new InAtion_1.InAction(s).constructor.name && s.stateOfRepository.constructor.name === new EmptyRepository_1.EmptyRepository(s, s.manager.repo.getRepoByServer(s)).constructor.name) {
            s.stateOfConnection = new Connected_1.Connected(s);
        }
    }
}
function arrStat() {
    console.log("Connected : " + manager.connected.length + " Disconnected : " + manager.disconected.length + " InAcion : " + manager.inaction.length);
}
function arrStatName() {
    for (var _i = 0, _a = manager.inaction; _i < _a.length; _i++) {
        var s = _a[_i];
        console.log("In Action : " + s.name);
    }
    for (var _b = 0, _c = manager.connected; _b < _c.length; _b++) {
        var s = _c[_b];
        console.log("Connected : " + s.name);
    }
    for (var _d = 0, _e = manager.disconected; _d < _e.length; _d++) {
        var s = _e[_d];
        console.log("Disconnected : " + s.name);
    }
}
exports.app.listen(PORT);
//New changes 25.03
function watchDog() {
    try {
        var client = manager.chooseServer().pool;
        client
            .query('SELECT DISTINCT datname FROM pg_stat_activity WHERE datname != \'postgres\'; ')
            .then(function (rowResp) {
            var rowData = rowResp.rows;
            var connectedList = [];
            for (var s = 0; s < rowData.length; s++) {
                connectedList.push(rowData[s].datname);
            }
            manager.checkingConnectionByWatchDog(connectedList);
            console.log("----------------------------------------------------------------");
            stat();
            showData();
        });
    }
    catch (e) { }
}
function showData() {
    var server = manager.chooseServer();
    var password = new Array();
    var mail = new Array();
    try {
        var client = server.pool;
        client
            .query('SELECT mail from users;')
            .then(function (rowResp) {
            var rowData = rowResp.rows;
            for (var s = 0; s < rowData.length; s++) {
                mail.push(rowData[s].mail);
            }
        });
    }
    catch (e) { }
    try {
        var client = server.pool;
        client
            .query('SELECT password from users;')
            .then(function (rowResp) {
            var rowData = rowResp.rows;
            for (var s = 0; s < rowData.length; s++) {
                password.push(rowData[s].password);
            }
        });
    }
    catch (e) { }
    // manager.showData(server,mail,password)
}
//----------------------------------------------------------------------
console.log('Server on port', PORT, '\n');
