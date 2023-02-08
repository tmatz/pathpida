"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNextTemplate = void 0;
var parseAppDir_1 = require("./parseAppDir");
var parsePagesDir_1 = require("./parsePagesDir");
var createNextTemplate = function (input, output, ignorePath, suffix, appDir, pageExtensions) {
    if (pageExtensions === void 0) { pageExtensions = ['tsx', 'ts', 'jsx', 'js']; }
    var appDirData = appDir
        ? (0, parseAppDir_1.parseAppDir)(appDir.input, output, ignorePath, suffix)
        : { imports: [], text: '' };
    var pagesDir = input
        ? (0, parsePagesDir_1.parsePagesDir)(input, output, ignorePath, pageExtensions, suffix, appDirData.imports.length)
        : { imports: [], text: '' };
    var imports = __spreadArray(__spreadArray([], __read(appDirData.imports), false), __read(pagesDir.imports), false);
    return "".concat(imports.join('\n')).concat(imports.length ? '\n\n' : '', "export const pagesPath = {\n").concat(appDirData.text).concat(appDirData.text && pagesDir.text ? ',\n' : '').concat(pagesDir.text, "\n}\n\nexport type PagesPath = typeof pagesPath\n");
};
exports.createNextTemplate = createNextTemplate;
//# sourceMappingURL=createNextTemplate.js.map