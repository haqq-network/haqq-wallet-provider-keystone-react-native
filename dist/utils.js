"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeID = void 0;
function makeID(length) {
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    return Array.from({ length: length })
        .map(function () { return characters.charAt(Math.floor(Math.random() * charactersLength)); })
        .join('');
}
exports.makeID = makeID;
