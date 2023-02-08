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
exports.parseAppDir = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var isIgnored_1 = require("../isIgnored");
var parseQueryFromTS_1 = require("../parseQueryFromTS");
var replaceWithUnderscore_1 = require("../replaceWithUnderscore");
var parsePagesDir_1 = require("./parsePagesDir");
var parseAppDir = function (input, output, ignorePath, suffix) {
    var ig = (0, isIgnored_1.createIg)(ignorePath);
    var pageFileNames = ['page.tsx', 'page.jsx', 'page.js'];
    var imports = [];
    var getImportName = function (file) {
        var result = (0, parseQueryFromTS_1.parseQueryFromTS)(output, file, suffix, imports.length);
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
                !(0, isIgnored_1.isIgnored)(ig, ignorePath, targetDir, file),
                fs_1.default.statSync(path_1.default.posix.join(targetDir, file)).isDirectory()
            ].every(Boolean);
        })
            .sort()
            .map(function (file) {
            var newSlugs = __spreadArray([], __read(slugs), false);
            var target = path_1.default.posix.join(targetDir, file);
            if (file.startsWith('(') && file.endsWith(')')) {
                return createPathObjString(target, indent.slice(2), url, newSlugs, '<% props %>');
            }
            var newUrl = "".concat(url, "/").concat(file);
            var valFn = "".concat(indent).concat(JSON.stringify((0, replaceWithUnderscore_1.replaceWithUnderscore)(file)), ": {\n<% next %>\n").concat(indent, "}");
            if (file.startsWith('[') && file.endsWith(']')) {
                var slug = file.replace(/[.[\]]/g, '');
                valFn = "".concat(indent).concat("_".concat(slug), ": (").concat(slug).concat(file.startsWith('[[') ? '?' : '', ": ").concat(/\[\./.test(file) ? 'string[]' : 'string | number', ") => ({\n<% next %>\n").concat(indent, "})");
                newSlugs.push(slug);
            }
            var indexFile = fs_1.default.readdirSync(target).find(function (name) { return pageFileNames.includes(name); });
            return createPathObjString(target, indent, newUrl, newSlugs, valFn.replace('<% next %>', '<% props %>'), indexFile &&
                (0, parsePagesDir_1.createMethods)(indent, getImportName(path_1.default.posix.join(target, indexFile)), newSlugs, newUrl));
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
    var rootIndexFile = fs_1.default.readdirSync(input).find(function (name) { return pageFileNames.includes(name); });
    var rootIndent = '';
    var rootMethods;
    if (rootIndexFile) {
        rootMethods = (0, parsePagesDir_1.createMethods)(rootIndent, getImportName(path_1.default.posix.join(input, rootIndexFile)), [], '/');
    }
    var text = createPathObjString(input, rootIndent, '', [], '<% props %>', rootMethods);
    return { imports: imports, text: text };
};
exports.parseAppDir = parseAppDir;
//# sourceMappingURL=parseAppDir.js.map