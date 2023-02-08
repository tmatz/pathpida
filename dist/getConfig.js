"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
// import type { NextConfig } from 'next/dist/server/config'
var path_1 = __importDefault(require("path"));
var getFrameworkType = function (dir) {
    var _a, _b;
    var packageJson = JSON.parse(fs_1.default.readFileSync(path_1.default.join(dir, 'package.json'), 'utf8'));
    var deps = Object.assign((_a = packageJson.devDependencies) !== null && _a !== void 0 ? _a : {}, (_b = packageJson.dependencies) !== null && _b !== void 0 ? _b : {});
    return deps.nuxt ? 'nuxtjs' : 'nextjs';
};
exports.default = (function (enableStatic, output, igPath, suffix, dir) {
    if (dir === void 0) { dir = process.cwd(); }
    return __awaiter(void 0, void 0, void 0, function () {
        var type, ignorePath, config /*: NextConfig */, e_1, srcDir, utilsPath, inputDir, nuxttsPath, config, srcDir;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    type = getFrameworkType(dir);
                    ignorePath = igPath && path_1.default.join(dir, igPath);
                    if (!(type === 'nextjs')) return [3 /*break*/, 6];
                    config = void 0;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, require('next/dist/server/config').default(require('next/constants').PHASE_PRODUCTION_BUILD, dir)];
                case 2:
                    // >= v11.1.0
                    config = _e.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _e.sent();
                    return [4 /*yield*/, require('next/dist/next-server/server/config').default(require('next/constants').PHASE_PRODUCTION_BUILD, dir)];
                case 4:
                    // < v11.1.0
                    config = _e.sent();
                    return [3 /*break*/, 5];
                case 5:
                    srcDir = fs_1.default.existsSync(path_1.default.posix.join(dir, 'src/pages')) ||
                        fs_1.default.existsSync(path_1.default.posix.join(dir, 'src/app'))
                        ? path_1.default.posix.join(dir, 'src')
                        : dir;
                    if (!output) {
                        utilsPath = path_1.default.join(srcDir, 'utils');
                        output = fs_1.default.existsSync(utilsPath) ? utilsPath : path_1.default.join(srcDir, 'lib');
                    }
                    if (!fs_1.default.existsSync(output))
                        fs_1.default.mkdirSync(output);
                    inputDir = path_1.default.posix.join(srcDir, 'pages');
                    return [2 /*return*/, {
                            type: type,
                            input: fs_1.default.existsSync(inputDir) ? inputDir : undefined,
                            staticDir: enableStatic ? path_1.default.posix.join(dir, 'public') : undefined,
                            output: output,
                            ignorePath: ignorePath,
                            suffix: suffix,
                            appDir: ((_a = config.experimental) === null || _a === void 0 ? void 0 : _a.appDir) ? { input: path_1.default.posix.join(srcDir, 'app') } : undefined,
                            pageExtensions: config.pageExtensions,
                            basepath: config.basePath
                        }];
                case 6:
                    nuxttsPath = path_1.default.join(dir, 'nuxt.config.ts');
                    return [4 /*yield*/, require('@nuxt/config').loadNuxtConfig({
                            rootDir: dir,
                            configFile: fs_1.default.existsSync(nuxttsPath) ? nuxttsPath : undefined
                        })];
                case 7:
                    config = _e.sent();
                    srcDir = path_1.default.posix.join(dir, (_b = config.srcDir) !== null && _b !== void 0 ? _b : '');
                    output = output !== null && output !== void 0 ? output : path_1.default.posix.join(srcDir, 'plugins');
                    if (!fs_1.default.existsSync(output))
                        fs_1.default.mkdirSync(output);
                    return [2 /*return*/, {
                            type: type,
                            input: path_1.default.posix.join(srcDir, 'pages'),
                            staticDir: enableStatic ? path_1.default.posix.join(srcDir, 'static') : undefined,
                            output: output,
                            ignorePath: ignorePath,
                            suffix: suffix,
                            trailingSlash: (_c = config.router) === null || _c === void 0 ? void 0 : _c.trailingSlash,
                            basepath: (_d = config.router) === null || _d === void 0 ? void 0 : _d.base
                        }];
            }
        });
    });
});
//# sourceMappingURL=getConfig.js.map