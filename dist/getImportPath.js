"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportPath = void 0;
var path_1 = __importDefault(require("path"));
function getImportPath(from, to) {
    return path_1.default
        .relative(from, to)
        .replace(/\\/g, '/')
        .replace(/(\/index)?\.(tsx|ts|vue)?$/, '');
}
exports.getImportPath = getImportPath;
//# sourceMappingURL=getImportPath.js.map