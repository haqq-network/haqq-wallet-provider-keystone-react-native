"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCryptoAccount = exports.isCryptoHDKey = exports.uuidv4 = void 0;
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
