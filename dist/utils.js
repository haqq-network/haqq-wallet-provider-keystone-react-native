"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitPath = exports.hexBuffer = exports.isCryptoAccount = exports.isCryptoHDKey = exports.uuidv4 = void 0;
var bc_ur_registry_eth_1 = require("@keystonehq/bc-ur-registry-eth");
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
function isCryptoHDKey(item) {
    return item instanceof bc_ur_registry_eth_1.CryptoHDKey;
}
exports.isCryptoHDKey = isCryptoHDKey;
function isCryptoAccount(item) {
    return item instanceof bc_ur_registry_eth_1.CryptoAccount;
}
exports.isCryptoAccount = isCryptoAccount;
function hexBuffer(str) {
    return Buffer.from(str.startsWith("0x") ? str.slice(2) : str, "hex");
}
exports.hexBuffer = hexBuffer;
function splitPath(path) {
    var result = [];
    var components = path.split("/");
    components.forEach(function (element) {
        var number = parseInt(element, 10);
        if (isNaN(number)) {
            return; // FIXME shouldn't it throws instead?
        }
        if (element.length > 1 && element[element.length - 1] === "'") {
            number += 0x80000000;
        }
        result.push(number);
    });
    return result;
}
exports.splitPath = splitPath;
