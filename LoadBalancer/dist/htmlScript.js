"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var btn = document.getElementById('btn');
btn.addEventListener("click", function (e) { return index_1.manager.servers[0].changeState(); });
btn.onclick = function () {
    change();
};
function change() {
    index_1.manager.servers[0].changeState();
}
