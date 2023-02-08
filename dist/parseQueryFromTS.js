"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryFromTS = void 0;
var fs_1 = __importDefault(require("fs"));
var getImportPath_1 = require("./getImportPath");
var makeSuffix_1 = require("./makeSuffix");
var parseQueryFromTS = function (output, file, suffix, index) {
    var fileData = fs_1.default.readFileSync(file, 'utf8');
    var typeName = ['Query', 'OptionalQuery'].find(function (type) {
        return new RegExp("export (interface ".concat(type, " ?{|type ").concat(type, " ?=)")).test(fileData);
    });
    if (!typeName)
        return;
    var importPath = (0, getImportPath_1.getImportPath)(output, file);
    var importName = "".concat(typeName).concat((0, makeSuffix_1.makeSuffix)(suffix, index, importPath));
    return {
        importName: importName,
        importString: "import type { ".concat(typeName, " as ").concat(importName, " } from '").concat(importPath, "'")
    };
};
exports.parseQueryFromTS = parseQueryFromTS;
//# sourceMappingURL=parseQueryFromTS.js.map