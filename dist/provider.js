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
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var utils_2 = require("./utils");
var bc_ur_1 = require("@ngraveio/bc-ur");
var ProviderKeystoneReactNative = /** @class */ (function (_super) {
    __extends(ProviderKeystoneReactNative, _super);
    function ProviderKeystoneReactNative(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, __assign(__assign({}, options), { getPassword: function () { return Promise.resolve(''); } })) || this;
        _this.stop = false;
        _this.xpub = '';
        _this.xfp = '';
        _this.rootPath = '';
        var cryptoHDKeyCBOR = Buffer.from(_this._options.cryptoHDKeyCBORHex, 'hex');
        var hdKey = bc_ur_registry_eth_1.CryptoHDKey.fromCBOR(cryptoHDKeyCBOR);
        _this.xpub = hdKey.getBip32Key();
        _this.xfp = ((_b = (_a = hdKey.getOrigin()) === null || _a === void 0 ? void 0 : _a.getSourceFingerprint()) === null || _b === void 0 ? void 0 : _b.toString('hex')) || '';
        _this.rootPath = ((_c = hdKey.getOrigin()) === null || _c === void 0 ? void 0 : _c.getPath()) || '';
        return _this;
    }
    ProviderKeystoneReactNative.prototype.getIdentifier = function () {
        return this._options.cryptoHDKeyCBORHex;
    };
    ProviderKeystoneReactNative.prototype.getAccountInfo = function (hdPath) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, subPath, hdNode;
            return __generator(this, function (_a) {
                resp = { publicKey: '', address: '' };
                try {
                    this.stop = false;
                    subPath = hdPath.replace("44'/60'/0'/", '');
                    console.log('subPath', subPath);
                    console.log('this.xpub', this.xpub);
                    console.log('this.xfp', this.xfp);
                    console.log('this.rootPath', this.rootPath);
                    hdNode = utils_1.HDNode
                        .fromExtendedKey(this.xpub)
                        .derivePath(subPath);
                    resp = {
                        publicKey: hdNode.publicKey,
                        address: ethers_1.ethers.utils.computeAddress(hdNode.publicKey),
                    };
                    this.emit('getPublicKeyForHDPath', true);
                }
                catch (e) {
                    if (e instanceof Error) {
                        this.catchError(e, 'getPublicKeyForHDPath');
                    }
                }
                return [2 /*return*/, resp];
            });
        });
    };
    ProviderKeystoneReactNative.prototype.signTransaction = function (hdPath, transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, unsignedTx, unsignedTxBuffer, address, requestID, ethSignRequest, signatureBuffer, signatureUr, ethSignature, signature, jsonSignature, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this.stop = false;
                        unsignedTx = ethers_1.ethers.utils.serializeTransaction(transaction);
                        unsignedTxBuffer = Buffer.from(unsignedTx.substring(2), "hex");
                        return [4 /*yield*/, this.getAccountInfo(hdPath)];
                    case 2:
                        address = (_a.sent()).address;
                        requestID = (0, utils_2.makeID)(5);
                        ethSignRequest = bc_ur_registry_eth_1.EthSignRequest.constructETHRequest(unsignedTxBuffer, bc_ur_registry_eth_1.DataType.transaction, hdPath, this.xfp, requestID, transaction.chainId, address);
                        return [4 /*yield*/, this._options.awaitForSign({
                                requestID: requestID,
                                signRequest: ethSignRequest.toUR().cbor
                            })];
                    case 3:
                        signatureBuffer = _a.sent();
                        signatureUr = bc_ur_1.UR.fromBuffer(signatureBuffer);
                        if (signatureUr.type === 'eth-signature') {
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
                        }
                        else {
                            throw new Error('Invalid signature type');
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1 instanceof Error) {
                            this.catchError(e_1, 'signTransaction');
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
    ProviderKeystoneReactNative.prototype.confirmAddress = function (hdPath) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, response;
            return __generator(this, function (_a) {
                resp = '';
                try {
                    this.stop = false;
                    response = { address: '0x123' } //await eth.getAddress(hdPath, true);
                    ;
                    resp = response.address;
                    this.emit('confirmAddress', true);
                }
                catch (e) {
                    if (e instanceof Error) {
                        this.emit('confirmAddress', false, e.message);
                        throw new Error(e.message);
                    }
                }
                return [2 /*return*/, resp];
            });
        });
    };
    ProviderKeystoneReactNative.prototype.catchError = function (e, source) {
        switch (e.name) {
            case 'TransportStatusError':
                // @ts-ignore
                switch (String(e.statusCode)) {
                    case '27010':
                        this.emit(source, false, e.message, e.name, '27010');
                        throw new Error('keystone_locked');
                    case '27013':
                        this.emit(source, false, e.message, e.name, '27013');
                        throw new Error('keystone_rejected');
                }
                break;
            default:
                _super.prototype.catchError.call(this, e, source);
                break;
        }
    };
    return ProviderKeystoneReactNative;
}(provider_base_1.Provider));
exports.ProviderKeystoneReactNative = ProviderKeystoneReactNative;
