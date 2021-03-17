"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = void 0;
var button = /** @class */ (function () {
    function button(manager) {
        var btn = document.getElementById("coolbutton");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", (e.Event), this.status(manager));
    }
    button.prototype.status = function (manager) {
        manager.servers[0].changeState();
    };
    return button;
}());
exports.button = button;
