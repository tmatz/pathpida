"use strict";
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
exports.createStaticTemplate = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var isIgnored_1 = require("./isIgnored");
var replaceWithUnderscore_1 = require("./replaceWithUnderscore");
var createStaticTemplate = function (input, basepath, ignorePath, suffix) {
    var ig = (0, isIgnored_1.createIg)(ignorePath);
    var createPublicString = function (targetDir, indent, url, text) {
        indent += '  ';
        var files = fs_1.default.readdirSync(targetDir).sort();
        var replacedFiles = files.map(replaceWithUnderscore_1.replaceWithUnderscore);
        var duplicatedInfo = replacedFiles.reduce(function (a, b, i) {
            var _a;
            var _b;
            return (__assign(__assign({}, a), (_a = {}, _a[b] = __spreadArray(__spreadArray([], __read(((_b = a[b]) !== null && _b !== void 0 ? _b : [])), false), [i], false), _a)));
        }, {});
        var props = files
            .map(function (file, i) {
            var newUrl = "".concat(url, "/").concat(file);
            var target = path_1.default.posix.join(targetDir, file);
            if ((0, isIgnored_1.isIgnored)(ig, ignorePath, targetDir, file))
                return '';
            var replacedFile = replacedFiles[i];
            var valFn = "".concat(indent).concat(duplicatedInfo[replacedFile].length > 1
                ? "".concat(replacedFile, "_").concat(duplicatedInfo[replacedFile].indexOf(i))
                : replacedFile, ": <% next %>");
            return fs_1.default.statSync(target).isFile()
                ? valFn.replace('<% next %>', "'".concat(newUrl, "'"))
                : fs_1.default.statSync(target).isDirectory()
                    ? createPublicString(target, indent, newUrl, valFn.replace('<% next %>', "{\n<% props %>\n".concat(indent, "}")))
                    : '';
        })
            .filter(Boolean);
        return text.replace('<% props %>', props.join(',\n'));
    };
    var text = createPublicString(input, '', typeof basepath === 'string' ? basepath.replace(/\/+$/, '') : '', '{\n<% props %>\n} as const');
    return "\nexport const staticPath = ".concat(text, "\n\nexport type StaticPath = typeof staticPath\n");
};
exports.createStaticTemplate = createStaticTemplate;
//# sourceMappingURL=createStaticTemplate.js.map