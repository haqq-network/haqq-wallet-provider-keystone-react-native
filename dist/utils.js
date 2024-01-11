"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEip712Hash = exports.keccak256Hash = exports.sha3 = exports.bytesToHex = exports.uint8ArrayToHexString = exports.utf8ToBytes = exports.hexToBytes = exports.bytesToUint8Array = exports.hexToUint8Array = exports.padLeft = exports.isHexStrict = exports.numberToHex = exports.splitPath = exports.hexBuffer = exports.isCryptoAccount = exports.isCryptoHDKey = exports.uuidV4Stringify = exports.uuidv4 = void 0;
var bc_ur_registry_eth_1 = require("@keystonehq/bc-ur-registry-eth");
var utils_1 = require("ethers/lib/utils");
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
function uuidV4Stringify(buffer) {
    var uid = hexBuffer(buffer);
    return [
        buffer.slice(0, 3),
        buffer.slice(4, 5),
        buffer.slice(6, 7),
        buffer.slice(8, 9),
        buffer.slice(10, 15),
    ]
        .map(function (part) { return part.toString('hex'); })
        .join('-');
}
exports.uuidV4Stringify = uuidV4Stringify;
function isCryptoHDKey(item) {
    return item instanceof bc_ur_registry_eth_1.CryptoHDKey;
}
exports.isCryptoHDKey = isCryptoHDKey;
function isCryptoAccount(item) {
    return item instanceof bc_ur_registry_eth_1.CryptoAccount;
}
exports.isCryptoAccount = isCryptoAccount;
function hexBuffer(str) {
    if (Buffer.isBuffer(str)) {
        return Buffer.from(str);
    }
    return Buffer.from(str.startsWith('0x') ? str.slice(2) : str, 'hex');
}
exports.hexBuffer = hexBuffer;
function splitPath(path) {
    var result = [];
    var components = path.split('/');
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
/**
 * Converts value to it's hex representation
 */
var numberToHex = function (value) {
    if ((typeof value === 'number' || typeof value === 'bigint') && value < 0) {
        return "-0x".concat(value.toString(16).slice(1));
    }
    if ((typeof value === 'number' || typeof value === 'bigint') && value >= 0) {
        return "0x".concat(value.toString(16));
    }
    if (typeof value === 'string' && (0, exports.isHexStrict)(value)) {
        var _a = value.startsWith('-')
            ? [true, value.slice(1)]
            : [false, value], negative = _a[0], hex = _a[1];
        var hexValue = hex.split(/^(-)?0(x|X)/).slice(-1)[0];
        return "".concat(negative ? '-' : '', "0x").concat(hexValue
            .replace(/^0+/, '')
            .toLowerCase());
    }
    if (typeof value === 'string' && !(0, exports.isHexStrict)(value)) {
        return (0, exports.numberToHex)(BigInt(value));
    }
    throw new Error("numberToHex invalid value: ".concat(value));
};
exports.numberToHex = numberToHex;
var isHexStrict = function (hex) {
    return typeof hex === 'string' && /^((-)?0x[0-9a-f]+|(0x))$/i.test(hex);
};
exports.isHexStrict = isHexStrict;
/**
 * Adds a padding on the left of a string, if value is a integer or bigInt will be converted to a hex string.
 */
var padLeft = function (value, characterAmount, sign) {
    if (sign === void 0) { sign = '0'; }
    if (typeof value === 'string' && !(0, exports.isHexStrict)(value)) {
        return value.padStart(characterAmount, sign);
    }
    var hex = typeof value === 'string' && (0, exports.isHexStrict)(value)
        ? value
        : (0, exports.numberToHex)(value);
    var _a = hex.startsWith('-')
        ? ['-0x', hex.slice(3)]
        : ['0x', hex.slice(2)], prefix = _a[0], hexValue = _a[1];
    return "".concat(prefix).concat(hexValue.padStart(characterAmount, sign));
};
exports.padLeft = padLeft;
function hexToUint8Array(hex) {
    var value;
    if (hex.toLowerCase().startsWith('0x')) {
        value = hex.slice(2);
    }
    else {
        value = hex;
    }
    if (value.length % 2 !== 0) {
        throw new Error("hex string has odd length: ".concat(hex));
    }
    var bytes = new Uint8Array(Math.ceil(value.length / 2));
    for (var i = 0; i < bytes.length; i += 1) {
        var byte = parseInt(value.substring(i * 2, i * 2 + 2), 16);
        bytes[i] = byte;
    }
    return bytes;
}
exports.hexToUint8Array = hexToUint8Array;
/**
 * Convert a value from bytes to Uint8Array
 * @param data - Data to be converted
 * @returns - The Uint8Array representation of the input data
 *
 * @example
 * ```ts
 * console.log(web3.utils.bytesToUint8Array("0xab")));
 * > Uint8Array(1) [ 171 ]
 * ```
 */
var bytesToUint8Array = function (data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    if (Array.isArray(data)) {
        return new Uint8Array(data);
    }
    if (typeof data === 'string') {
        return hexToUint8Array(data);
    }
    throw new Error(data);
};
exports.bytesToUint8Array = bytesToUint8Array;
/**
 * Convert a hex string to a byte array
 * @param hex - Hex string to be converted
 * @returns - The byte array representation of the input hex string
 *
 * @example
 * ```ts
 * console.log(web3.utils.hexToBytes('0x74657374'));
 * > Uint8Array(4) [ 116, 101, 115, 116 ]
 * ```
 */
var hexToBytes = function (bytes) {
    if (typeof bytes === 'string' && bytes.slice(0, 2).toLowerCase() !== '0x') {
        return (0, exports.bytesToUint8Array)("0x".concat(bytes));
    }
    return (0, exports.bytesToUint8Array)(bytes);
};
exports.hexToBytes = hexToBytes;
function utf8ToBytes(str) {
    if (typeof str !== 'string') {
        throw new Error("utf8ToBytes expected string, got ".concat(typeof str));
    }
    return new Uint8Array(new TextEncoder().encode(str));
}
exports.utf8ToBytes = utf8ToBytes;
function uint8ArrayToHexString(uint8Array) {
    var hexString = '0x';
    // @ts-ignore
    for (var _i = 0, uint8Array_1 = uint8Array; _i < uint8Array_1.length; _i++) {
        var e = uint8Array_1[_i];
        var hex = e.toString(16);
        hexString += hex.length === 1 ? "0".concat(hex) : hex;
    }
    return hexString;
}
exports.uint8ArrayToHexString = uint8ArrayToHexString;
var bytesToHex = function (bytes) {
    return uint8ArrayToHexString((0, exports.bytesToUint8Array)(bytes));
};
exports.bytesToHex = bytesToHex;
var SHA3_EMPTY_BYTES = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
/**
 * computes the Keccak-256 hash of the input and returns a hexstring
 * @param data - the input to hash
 * @returns - the Keccak-256 hash of the input
 *
 * @example
 * ```ts
 * console.log(web3.utils.sha3('web3.js'));
 * > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
 *
 * console.log(web3.utils.sha3(''));
 * > undefined
 * ```
 */
var sha3 = function (data) {
    var updatedData;
    if (typeof data === 'string') {
        if (data.startsWith('0x') && (0, exports.isHexStrict)(data)) {
            updatedData = (0, exports.hexToBytes)(data);
        }
        else {
            updatedData = utf8ToBytes(data);
        }
    }
    else {
        updatedData = data;
    }
    var hash = (0, exports.bytesToHex)((0, utils_1.keccak256)(updatedData));
    // EIP-1052 if hash is equal to c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470, keccak was given empty data
    return hash === SHA3_EMPTY_BYTES ? undefined : hash;
};
exports.sha3 = sha3;
function keccak256Hash(data) {
    var _a;
    return (0, exports.padLeft)((_a = (0, exports.sha3)(data)) === null || _a === void 0 ? void 0 : _a.slice(2), 64);
}
exports.keccak256Hash = keccak256Hash;
function generateEip712Hash(domainHash, structHash) {
    return "0x".concat(keccak256Hash("0x1901".concat(domainHash).concat(structHash)));
}
exports.generateEip712Hash = generateEip712Hash;
