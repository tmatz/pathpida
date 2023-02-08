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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNuxtTemplate = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var getImportPath_1 = require("./getImportPath");
var isIgnored_1 = require("./isIgnored");
var makeSuffix_1 = require("./makeSuffix");
var parseQueryFromTS_1 = require("./parseQueryFromTS");
var replaceWithUnderscore_1 = require("./replaceWithUnderscore");
var createMethods = function (indent, importName, pathname, trailingSlash) {
    return "".concat(indent, "  $url: (url").concat((importName === null || importName === void 0 ? void 0 : importName.startsWith('Query')) ? '' : '?', ": { ").concat(importName ? "query".concat(importName.startsWith('Optional') ? '?' : '', ": ").concat(importName, ", ") : '', "hash?: string }) => ({ path: ").concat(/\${/.test(pathname) ? '`' : "'").concat(pathname).concat(trailingSlash || pathname === '' ? '/' : '').concat(/\${/.test(pathname) ? '`' : "'").concat(importName ? ", query: url".concat(importName.startsWith('Query') ? '' : '?', ".query as any") : '', ", hash: url").concat((importName === null || importName === void 0 ? void 0 : importName.startsWith('Query')) ? '' : '?', ".hash })");
};
var parseQueryFromVue = function (output, file, suffix, index) {
    var fileData = fs_1.default.readFileSync(file, 'utf8');
    var typeName = ['Query', 'OptionalQuery'].find(function (type) {
        return new RegExp("export (interface ".concat(type, " ?{|type ").concat(type, " ?= ?{)")).test(fileData);
    });
    if (!typeName)
        return;
    var queryRegExp = new RegExp("export (interface ".concat(typeName, " ?{|type ").concat(typeName, " ?= ?{)"));
    var _a = __read(fileData.split(queryRegExp), 3), typeText = _a[1], targetText = _a[2];
    var length = targetText.length;
    var cursor = 0;
    var depth = 1;
    while (depth && cursor <= length) {
        if (targetText[cursor] === '}') {
            depth -= 1;
        }
        else if (targetText[cursor] === '{') {
            depth += 1;
        }
        cursor += 1;
    }
    var importName = "".concat(typeName).concat((0, makeSuffix_1.makeSuffix)(suffix, index, (0, getImportPath_1.getImportPath)(output, file)));
    return {
        importName: importName,
        importString: "".concat(typeText.replace(typeName, importName)).concat(targetText
            .slice(0, cursor)
            .replace(/\r/g, ''), "\n")
    };
};
var createNuxtTemplate = function (input, output, ignorePath, suffix, trailingSlash) {
    if (trailingSlash === void 0) { trailingSlash = false; }
    var ig = (0, isIgnored_1.createIg)(ignorePath);
    var imports = [];
    var getImportName = function (file) {
        var result = path_1.default.extname(file).startsWith('.ts')
            ? (0, parseQueryFromTS_1.parseQueryFromTS)(output, file, suffix, imports.length)
            : parseQueryFromVue(output, file, suffix, imports.length);
        if (result) {
            imports.push(result.importString);
            return result.importName;
        }
    };
    var createPathObjString = function (targetDir, importBasePath, indent, url, text, methodsOfIndexTsFile) {
        indent += '  ';
        var props = fs_1.default
            .readdirSync(targetDir)
            .filter(function (file) {
            return [
                !file.startsWith('-'),
                !/\.s?css$/.test(file),
                !file.endsWith('.d.ts'),
                !(0, isIgnored_1.isIgnored)(ig, ignorePath, targetDir, file)
            ].every(Boolean);
        })
            .sort()
            .map(function (file, _, arr) {
            var basename = path_1.default.basename(file, path_1.default.extname(file));
            var valFn = "".concat(indent).concat((0, replaceWithUnderscore_1.replaceWithUnderscore)(basename), ": {\n<% next %>\n").concat(indent, "}");
            var newUrl = "".concat(url, "/").concat(basename);
            if (basename.startsWith('_')) {
                var slug = basename.slice(1);
                var isPassValNullable = basename !== file;
                valFn = "".concat(indent, "_").concat(slug, ": (").concat(slug).concat(isPassValNullable ? '?' : '', ": string | number) => ({\n<% next %>\n").concat(indent, "})");
                newUrl = "".concat(url).concat(isPassValNullable ? "${".concat(slug, " !== undefined ? `/${").concat(slug, "}` : ''}") : "/${".concat(slug, "}"));
            }
            var target = path_1.default.posix.join(targetDir, file);
            if (fs_1.default.statSync(target).isFile() && basename !== 'index' && !arr.includes(basename)) {
                return valFn.replace('<% next %>', createMethods(indent, getImportName(target), newUrl, trailingSlash));
            }
            else if (fs_1.default.statSync(target).isDirectory()) {
                var indexFile = fs_1.default
                    .readdirSync(target)
                    .find(function (name) { return path_1.default.basename(name, path_1.default.extname(name)) === 'index'; });
                return createPathObjString(target, "".concat(importBasePath, "/").concat(file), indent, newUrl, valFn.replace('<% next %>', '<% props %>'), indexFile &&
                    createMethods(indent, getImportName(path_1.default.posix.join(target, indexFile)), newUrl, trailingSlash));
            }
            return '';
        })
            .filter(Boolean);
        return text.replace('<% props %>', "".concat(props.join(',\n')).concat(methodsOfIndexTsFile ? "".concat(props.length ? ',\n' : '').concat(methodsOfIndexTsFile) : ''));
    };
    var rootIndexFile = fs_1.default
        .readdirSync(input)
        .find(function (name) { return path_1.default.basename(name, path_1.default.extname(name)) === 'index'; });
    var rootIndent = '';
    var rootMethods;
    if (rootIndexFile) {
        rootMethods = createMethods(rootIndent, getImportName(path_1.default.posix.join(input, rootIndexFile)), '', trailingSlash);
    }
    var text = createPathObjString(input, '.', rootIndent, '', '{\n<% props %>\n}', rootMethods);
    var importsText = imports.filter(function (i) { return i.startsWith('import'); }).join('\n');
    var queriesText = imports.filter(function (i) { return !i.startsWith('import'); }).join('\n');
    return "import type { Plugin } from '@nuxt/types'\n".concat(importsText).concat(importsText && queriesText ? '\n' : '', "\n").concat(queriesText).concat(imports.length ? '\n' : '', "export const pagesPath = ").concat(text, "\n\nexport type PagesPath = typeof pagesPath\n");
};
exports.createNuxtTemplate = createNuxtTemplate;
//# sourceMappingURL=createNuxtTemplate.js.map