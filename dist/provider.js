"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderKeystoneReactNative = void 0;
var provider_base_1 = require("@haqq/provider-base");
var bc_ur_registry_eth_1 = require("@keystonehq/bc-ur-registry-eth");
var bc_ur_1 = require("@ngraveio/bc-ur");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var constants_1 = require("./constants");
var get_crypto_account_or_crypto_hdkey_1 = require("./get-crypto-account-or-crypto-hdkey");
var types_1 = require("./types");
var utils_2 = require("./utils");
var SUPPORTED_REGISTRY_TYPES = [
    types_1.SupportedRegistryTypeEnum.CryptoAccount,
    types_1.SupportedRegistryTypeEnum.CryptoHDkey,
];
var ProviderKeystoneReactNative = /** @class */ (function (_super) {
    __extends(ProviderKeystoneReactNative, _super);
    function ProviderKeystoneReactNative(options) {
        var _this = _super.call(this, __assign(__assign({}, options), { getPassword: function () { return Promise.resolve(''); } })) || this;
        _this.stop = false;
        _this._cryptoAccontDataMap = {};
        _this._registryItem = (0, get_crypto_account_or_crypto_hdkey_1.getCryptoAccountOrCryptoHDKeyFromHex)(_this._options.qrCBORHex);
        if (!_this._registryItem) {
            _this._throwError(types_1.ProviderKeystonErrorEnum.InvalidCborHex, 'constructor');
        }
        if (!SUPPORTED_REGISTRY_TYPES.includes(_this._registryItem.getRegistryType().getType())) {
            _this._throwError(types_1.ProviderKeystonErrorEnum.UnsupportedRegistryType, 'constructor');
        }
        if ((0, utils_2.isCryptoHDKey)(_this._registryItem)) {
            _this._initWithCryptoHDKey(_this._registryItem);
        }
        if ((0, utils_2.isCryptoAccount)(_this._registryItem)) {
            _this._initWithCryptoAccount(_this._registryItem);
        }
        return _this;
    }
    ProviderKeystoneReactNative.prototype.getIdentifier = function () {
        return this._options.qrCBORHex;
    };
    ProviderKeystoneReactNative.prototype.getKeyringAccount = function () {
        if ((0, utils_2.isCryptoAccount)(this._registryItem)) {
            var descriptor = this._registryItem.getOutputDescriptors().find(function (d) {
                var _a;
                try {
                    return !!((_a = d.getHDKey()) === null || _a === void 0 ? void 0 : _a.getNote());
                }
                catch (e) {
                    return false;
                }
            });
            return descriptor.getHDKey().getNote();
        }
        return types_1.KeyringAccountEnum.standard;
    };
    ProviderKeystoneReactNative.prototype.getPathPattern = function () {
        return constants_1.PATHS_PATTERN_MAP[this.getKeyringAccount()];
    };
    ProviderKeystoneReactNative.prototype.getAccountInfo = function (hdPath) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = { publicKey: '', address: '' };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        this.stop = false;
                        if (!(0, utils_2.isCryptoHDKey)(this._registryItem)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._getAccountInfoForCryptoHdKey(hdPath, this._registryItem)];
                    case 2:
                        resp = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(0, utils_2.isCryptoAccount)(this._registryItem)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._getAccountInfoForCryptoAccount(hdPath)];
                    case 4:
                        resp = _a.sent();
                        _a.label = 5;
                    case 5:
                        this.emit('getPublicKeyForHDPath', true);
                        return [3 /*break*/, 7];
                    case 6:
                        e_1 = _a.sent();
                        if (e_1 instanceof Error) {
                            this.catchError(e_1, 'getPublicKeyForHDPath');
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, resp];
                }
            });
        });
    };
    ProviderKeystoneReactNative.prototype.buildPath = function (index) {
        return this.getPathPattern().replace(constants_1.PATH_INDEX_KEY, "".concat(index));
    };
    ProviderKeystoneReactNative.prototype.signTransaction = function (hdPath, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, unsignedTx, dataType, unsignedTxBuffer, address, requestID, ethSignRequest, ur, signatureHex, signatureBuffer, signatureUr, ethSignature, signature, jsonSignature, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.stop = false;
                        unsignedTx = ethers_1.ethers.utils.serializeTransaction(transaction);
                        dataType = transaction.type === 0
                            ? bc_ur_registry_eth_1.DataType.transaction
                            : bc_ur_registry_eth_1.DataType.typedTransaction;
                        unsignedTxBuffer = Buffer.from(unsignedTx.substring(2), 'hex');
                        return [4 /*yield*/, this.getAccountInfo(hdPath)];
                    case 2:
                        address = (_a.sent()).address;
                        requestID = (0, utils_2.uuidv4)();
                        ethSignRequest = bc_ur_registry_eth_1.EthSignRequest.constructETHRequest(unsignedTxBuffer, dataType, hdPath, this._xfp, requestID, transaction.chainId, address);
                        ur = ethSignRequest.toUR();
                        return [4 /*yield*/, this._options.awaitForSign({
                                requestID: requestID,
                                cborHex: ur.cbor.toString('hex'),
                                urType: ur.type,
                            })];
                    case 3:
                        signatureHex = (_a.sent()).signatureHex;
                        signatureBuffer = Buffer.from(signatureHex, 'hex');
                        signatureUr = new bc_ur_1.UR(signatureBuffer, 'eth-signature');
                        ethSignature = bc_ur_registry_eth_1.ETHSignature.fromCBOR(signatureUr.cbor);
                        signature = ethSignature.getSignature();
                        jsonSignature = {
                            r: signature.slice(0, 32).toString('hex'),
                            s: signature.slice(32, 64).toString('hex'),
                            v: signature.slice(64).toString('hex'),
                        };
                        result = ethers_1.utils.serializeTransaction(transaction, {
                            r: '0x' + jsonSignature.r,
                            s: '0x' + jsonSignature.s,
                            v: parseInt(jsonSignature.v, 10),
                        });
                        this.emit('signTransaction', true);
                        return [2 /*return*/, result];
                    case 4:
                        e_2 = _a.sent();
                        if (e_2 instanceof Error) {
                            this.catchError(e_2, 'signTransaction');
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, resp];
                }
            });
        });
    };
    ProviderKeystoneReactNative.prototype.signPersonalMessage = function (hdPath, message) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, m, msg, signature, v;
            return __generator(this, function (_a) {
                resp = '';
                try {
                    this.stop = false;
                    m = Array.from(typeof message === 'string' ? (0, provider_base_1.stringToUtf8Bytes)(message) : message);
                    msg = Buffer.from(m).toString('hex');
                    signature = { r: 0, s: 0, v: 0 };
                    v = (signature.v - 27).toString(16).padStart(2, '0');
                    resp = '0x' + signature.r + signature.s + v;
                    this.emit('signPersonalMessage', true);
                }
                catch (e) {
                    if (e instanceof Error) {
                        this.catchError(e, 'signPersonalMessage');
                    }
                }
                return [2 /*return*/, resp];
            });
        });
    };
    ProviderKeystoneReactNative.prototype.signTypedData = function (hdPath, domainHash, valuesHash) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, signature, v;
            return __generator(this, function (_a) {
                resp = '';
                try {
                    this.stop = false;
                    signature = { r: 0, s: 0, v: 0 };
                    v = (signature.v - 27).toString(16).padStart(2, '0');
                    resp = '0x' + signature.r + signature.s + v;
                    this.emit('signTypedData', true);
                }
                catch (e) {
                    if (e instanceof Error) {
                        this.catchError(e, 'signTypedData');
                    }
                    return [2 /*return*/, ''];
                }
                return [2 /*return*/, resp];
            });
        });
    };
    ProviderKeystoneReactNative.prototype.abort = function () {
        this.emit('abortCall');
        this.stop = true;
    };
    ProviderKeystoneReactNative.prototype._initWithCryptoHDKey = function (hdKey) {
        var _a, _b;
        this._xfp =
            ((_b = (_a = hdKey.getOrigin()) === null || _a === void 0 ? void 0 : _a.getSourceFingerprint()) === null || _b === void 0 ? void 0 : _b.toString('hex')) || '';
    };
    ProviderKeystoneReactNative.prototype._initWithCryptoAccount = function (account) {
        this._xfp = account.getMasterFingerprint().toString('hex');
        for (var _i = 0, _a = account.getOutputDescriptors(); _i < _a.length; _i++) {
            var descriptor = _a[_i];
            try {
                var cryptoHDKey = descriptor.getHDKey();
                if (cryptoHDKey) {
                    var key = cryptoHDKey.getKey();
                    var path = cryptoHDKey.getOrigin().getPath();
                    var address = ethers_1.ethers.utils.computeAddress(key);
                    var publicKey = "0x".concat(key.toString('hex'));
                    this._cryptoAccontDataMap[path] = {
                        address: address,
                        publicKey: publicKey,
                    };
                }
            }
            catch (e) {
                throw new Error("KeystoneError#invalid_data: ".concat(e));
            }
        }
    };
    ProviderKeystoneReactNative.prototype._getAccountInfoForCryptoHdKey = function (hdPath, hdKey) {
        return __awaiter(this, void 0, void 0, function () {
            var rootPath, subPath, hdNode;
            return __generator(this, function (_a) {
                rootPath = "".concat(hdKey.getOrigin().getPath(), "/");
                subPath = hdPath.replace(rootPath, '');
                hdNode = utils_1.HDNode.fromExtendedKey(hdKey.getBip32Key()).derivePath(subPath);
                return [2 /*return*/, {
                        publicKey: hdNode.publicKey,
                        address: ethers_1.ethers.utils.computeAddress(hdNode.publicKey),
                    }];
            });
        });
    };
    ProviderKeystoneReactNative.prototype._getAccountInfoForCryptoAccount = function (hdPath) {
        return __awaiter(this, void 0, void 0, function () {
            var accointInfo;
            return __generator(this, function (_a) {
                accointInfo = this._cryptoAccontDataMap[hdPath];
                if (!accointInfo) {
                    this._throwError(types_1.ProviderKeystonErrorEnum.InvalidPath, 'getAccountInfo');
                }
                return [2 /*return*/, accointInfo];
            });
        });
    };
    ProviderKeystoneReactNative.prototype._throwError = function (errCode, source) {
        var err = new Error(errCode);
        var errMsg = "[ProviderKeystoneReactNative:".concat(source, "]: ").concat(errCode);
        this.emit(source, false, err.message, err.name);
        throw new Error(errMsg);
    };
    return ProviderKeystoneReactNative;
}(provider_base_1.Provider));
exports.ProviderKeystoneReactNative = ProviderKeystoneReactNative;
