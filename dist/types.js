"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyringAccountEnum = exports.ProviderKeystonErrorEnum = exports.SupportedRegistryTypeEnum = void 0;
var SupportedRegistryTypeEnum;
(function (SupportedRegistryTypeEnum) {
    SupportedRegistryTypeEnum["CryptoHDkey"] = "crypto-hdkey";
    SupportedRegistryTypeEnum["CryptoAccount"] = "crypto-account";
})(SupportedRegistryTypeEnum = exports.SupportedRegistryTypeEnum || (exports.SupportedRegistryTypeEnum = {}));
var ProviderKeystonErrorEnum;
(function (ProviderKeystonErrorEnum) {
    ProviderKeystonErrorEnum["UnsupportedRegistryType"] = "unsupported_registry_type";
    ProviderKeystonErrorEnum["InvalidCborHex"] = "invalid_cbor_hex";
    ProviderKeystonErrorEnum["InvalidPath"] = "invalid_path";
    ProviderKeystonErrorEnum["InvalidRequestID"] = "invalid_request_id";
})(ProviderKeystonErrorEnum = exports.ProviderKeystonErrorEnum || (exports.ProviderKeystonErrorEnum = {}));
var KeyringAccountEnum;
(function (KeyringAccountEnum) {
    KeyringAccountEnum["standard"] = "account.standard";
    KeyringAccountEnum["ledger_live"] = "account.ledger_live";
    KeyringAccountEnum["ledger_legacy"] = "account.ledger_legacy";
})(KeyringAccountEnum = exports.KeyringAccountEnum || (exports.KeyringAccountEnum = {}));
