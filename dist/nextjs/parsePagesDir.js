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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePagesDir = exports.createMethods = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var isIgnored_1 = require("../isIgnored");
var parseQueryFromTS_1 = require("../parseQueryFromTS");
var replaceWithUnderscore_1 = require("../replaceWithUnderscore");
var createMethods = function (indent, importName, slugs, pathname) {
    return "".concat(indent, "  $url: (url").concat((importName === null || importName === void 0 ? void 0 : importName.startsWith('Query')) ? '' : '?', ": { ").concat(importName ? "query".concat(importName.startsWith('Optional') ? '?' : '', ": ").concat(importName, ", ") : '', "hash?: string }) => ({ pathname: '").concat(pathname, "' as const").concat(slugs.length
        ? ", query: { ".concat(slugs.join(', ')).concat(importName ? ", ...url".concat(importName.startsWith('Query') ? '' : '?', ".query") : '', " }")
        : importName
            ? ", query: url".concat(importName.startsWith('Query') ? '' : '?', ".query")
            : '', ", hash: url").concat((importName === null || importName === void 0 ? void 0 : importName.startsWith('Query')) ? '' : '?', ".hash })");
};
exports.createMethods = createMethods;
var parsePagesDir = function (input, output, ignorePath, pageExtensions, suffix, appDirQueryLength) {
    if (pageExtensions === void 0) { pageExtensions = ['tsx', 'ts', 'jsx', 'js']; }
    var ig = (0, isIgnored_1.createIg)(ignorePath);
    var regExpChunk = "\\.(".concat(pageExtensions.join('|').replace(/\./g, '\\.'), ")$");
    var indexPageRegExp = new RegExp("^index".concat(regExpChunk));
    var pageExtRegExp = new RegExp(regExpChunk);
    var imports = [];
    var getImportName = function (file) {
        var result = (0, parseQueryFromTS_1.parseQueryFromTS)(output, file, suffix, appDirQueryLength + imports.length);
        if (result) {
            imports.push(result.importString);
            return result.importName;
        }
    };
    var createPathObjString = function (targetDir, indent, url, slugs, text, methodsOfIndexTsFile) {
        indent += '  ';
        var props = fs_1.default
            .readdirSync(targetDir)
            .filter(function (file) {
            return [
                !file.startsWith('_'),
                !file.endsWith('.d.ts'),
                "".concat(url, "/").concat(file) !== '/api',
                !(0, isIgnored_1.isIgnored)(ig, ignorePath, targetDir, file),
                fs_1.default.statSync(path_1.default.posix.join(targetDir, file)).isDirectory() || pageExtRegExp.test(file)
            ].every(Boolean);
        })
            .sort()
            .map(function (file) {
            var newSlugs = __spreadArray([], __read(slugs), false);
            var basename = file.replace(pageExtRegExp, '');
            var newUrl = "".concat(url, "/").concat(basename);
            var valFn = "".concat(indent).concat(JSON.stringify((0, replaceWithUnderscore_1.replaceWithUnderscore)(basename)), ": {\n<% next %>\n").concat(indent, "}");
            if (basename.startsWith('[') && basename.endsWith(']')) {
                var slug = basename.replace(/[.[\]]/g, '');
                valFn = "".concat(indent).concat("_".concat(slug), ": (").concat(slug).concat(basename.startsWith('[[') ? '?' : '', ": ").concat(/\[\./.test(basename) ? 'string[]' : 'string | number', ") => ({\n<% next %>\n").concat(indent, "})");
                newSlugs.push(slug);
            }
            var target = path_1.default.posix.join(targetDir, file);
            if (fs_1.default.statSync(target).isFile() && basename !== 'index') {
                return valFn.replace('<% next %>', (0, exports.createMethods)(indent, getImportName(target), newSlugs, newUrl));
            }
            else if (fs_1.default.statSync(target).isDirectory()) {
                var indexFile = fs_1.default.readdirSync(target).find(function (name) { return indexPageRegExp.test(name); });
                return createPathObjString(target, indent, newUrl, newSlugs, valFn.replace('<% next %>', '<% props %>'), indexFile &&
                    (0, exports.createMethods)(indent, getImportName(path_1.default.posix.join(target, indexFile)), newSlugs, newUrl));
            }
            return '';
        })
            .filter(Boolean);
        var joinedProps = props
            .reduce(function (accumulator, current) {
            var last = accumulator[accumulator.length - 1];
            if (last !== undefined) {
                var _a = __read(last.split('\n')), a = _a[0], b = _a.slice(1);
                var _b = __read(current.split('\n')), x = _b[0], y = _b.slice(1);
                if (a === x) {
                    y.pop();
                    var z = y.pop();
                    var merged = __spreadArray(__spreadArray(__spreadArray([a], __read(y), false), ["".concat(z, ",")], false), __read(b), false).join('\n');
                    return __spreadArray(__spreadArray([], __read(accumulator.slice(0, -1)), false), [merged], false);
                }
            }
            return __spreadArray(__spreadArray([], __read(accumulator), false), [current], false);
        }, [])
            .join(',\n');
        return text.replace('<% props %>', "".concat(joinedProps).concat(methodsOfIndexTsFile ? "".concat(props.length ? ',\n' : '').concat(methodsOfIndexTsFile) : ''));
    };
    var rootIndexFile = fs_1.default.readdirSync(input).find(function (name) { return indexPageRegExp.test(name); });
    var rootIndent = '';
    var rootMethods;
    if (rootIndexFile) {
        rootMethods = (0, exports.createMethods)(rootIndent, getImportName(path_1.default.posix.join(input, rootIndexFile)), [], '/');
    }
    var text = createPathObjString(input, rootIndent, '', [], '<% props %>', rootMethods);
    return { imports: imports, text: text };
};
exports.parsePagesDir = parsePagesDir;
//# sourceMappingURL=parsePagesDir.js.map