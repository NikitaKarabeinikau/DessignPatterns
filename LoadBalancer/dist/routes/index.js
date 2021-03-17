"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = __importDefault(require("body-parser"));
var controllers_1 = require("../classes/controller/controllers");
var router = express_1.Router();
var urlencodedParser = body_parser_1.default.urlencoded({ extended: false, });
var path = require('path');
router.get('/', urlencodedParser, function (req, res) {
    // res.sendFile(path.join(__dirname + '/views/table.html'))
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
router.get('/data', controllers_1.getMail);
router.get('/data/:id', controllers_1.getMailbyID);
// router.get('/data', (req,res) => createData)
exports.default = router;
