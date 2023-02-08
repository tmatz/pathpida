"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSuffix = void 0;
var crypto_1 = __importDefault(require("crypto"));
function makeSuffix(method, index, importPath) {
    switch (method) {
        case 'number':
            return "".concat(index);
        case 'path':
            return "_".concat(importPath.replace(/[^A-Za-z0-9_$]/g, function (c) { return (c === '/' ? '$' : '_'); }));
        case 'hash':
            return "_".concat(crypto_1.default.createHash('sha256').update(importPath).digest('hex'));
    }
}
exports.makeSuffix = makeSuffix;
//# sourceMappingURL=makeSuffix.js.map