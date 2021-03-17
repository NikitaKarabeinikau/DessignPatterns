"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Client-side code running');
var path = require('path');
var doc = path.join(__dirname + '/views/index.html');
var button = doc.getElementById('btn');
button.addEventListener('click', function () {
    console.log('button was clicked');
});
