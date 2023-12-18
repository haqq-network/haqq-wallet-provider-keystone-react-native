"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoAccountOrCryptoHDKeyFromHex = void 0;
var bc_ur_registry_eth_1 = require("@keystonehq/bc-ur-registry-eth");
var cache = new Map();
function getCryptoAccountOrCryptoHDKeyFromHex(hex) {
    try {
        if (cache.has(hex)) {
            return cache.get(hex);
        }
        var buffer = Buffer.from(hex, 'hex');
        var account = void 0;
        try {
            account = bc_ur_registry_eth_1.CryptoAccount.fromCBOR(buffer);
        }
        catch (e) { }
        if (!account) {
            try {
                account = bc_ur_registry_eth_1.CryptoHDKey.fromCBOR(buffer);
            }
            catch (e) { }
        }
        if (account) {
            cache.set(hex, account);
        }
        return account;
    }
    catch (e) { }
    return undefined;
}
exports.getCryptoAccountOrCryptoHDKeyFromHex = getCryptoAccountOrCryptoHDKeyFromHex;
