"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATHS_PATTERN_MAP = exports.PATH_INDEX_KEY = void 0;
var types_1 = require("./types");
exports.PATH_INDEX_KEY = '{{index}}';
exports.PATHS_PATTERN_MAP = (_a = {},
    _a[types_1.KeyringAccountEnum.standard] = "44'/60'/0'/0/".concat(exports.PATH_INDEX_KEY),
    _a[types_1.KeyringAccountEnum.ledger_live] = "44'/60'/".concat(exports.PATH_INDEX_KEY, "'/0/0"),
    _a[types_1.KeyringAccountEnum.ledger_legacy] = "44'/60'/0'/".concat(exports.PATH_INDEX_KEY),
    _a);
