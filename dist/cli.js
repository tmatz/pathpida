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
exports.run = void 0;
var minimist_1 = __importDefault(require("minimist"));
var buildTemplate_1 = __importDefault(require("./buildTemplate"));
var getConfig_1 = __importDefault(require("./getConfig"));
var watchInputDir_1 = __importDefault(require("./watchInputDir"));
var writeRouteFile_1 = __importDefault(require("./writeRouteFile"));
var last = function (value) {
    return value == null ? undefined : Array.isArray(value) ? value.slice(-1)[0] : value;
};
var parseSuffix = function (arg) {
    var value = last(arg);
    var suffixes = ['number', 'path', 'hash'];
    if (value && !suffixes.includes(value)) {
        console.error("ERROR: unexpected value of --suffix option.");
        process.exit(1);
    }
    return value || 'number';
};
var run = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var argv, suffix, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                argv = (0, minimist_1.default)(args, {
                    string: ['version', 'watch', 'enableStatic', 'output', 'ignorePath', 'suffix'],
                    alias: { v: 'version', w: 'watch', s: 'enableStatic', o: 'output', p: 'ignorePath' }
                });
                suffix = parseSuffix(argv.suffix);
                if (!(argv.version !== undefined)) return [3 /*break*/, 1];
                _a = console.log("v".concat(require('../package.json').version));
                return [3 /*break*/, 6];
            case 1:
                if (!(argv.watch !== undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, (function () { return __awaiter(void 0, void 0, void 0, function () {
                        var config;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, getConfig_1.default)(argv.enableStatic !== undefined, argv.output, argv.ignorePath, suffix)];
                                case 1:
                                    config = _a.sent();
                                    (0, writeRouteFile_1.default)((0, buildTemplate_1.default)(config));
                                    if (config.type === 'nextjs') {
                                        config.input && (0, watchInputDir_1.default)(config.input, function () { return (0, writeRouteFile_1.default)((0, buildTemplate_1.default)(config, 'pages')); });
                                        config.appDir && (0, watchInputDir_1.default)(config.appDir.input, function () { return (0, writeRouteFile_1.default)((0, buildTemplate_1.default)(config, 'pages')); });
                                    }
                                    else {
                                        (0, watchInputDir_1.default)(config.input, function () { return (0, writeRouteFile_1.default)((0, buildTemplate_1.default)(config, 'pages')); });
                                    }
                                    config.staticDir && (0, watchInputDir_1.default)(config.staticDir, function () { return (0, writeRouteFile_1.default)((0, buildTemplate_1.default)(config, 'static')); });
                                    return [2 /*return*/];
                            }
                        });
                    }); })()];
            case 2:
                _b = _e.sent();
                return [3 /*break*/, 5];
            case 3:
                _c = writeRouteFile_1.default;
                _d = buildTemplate_1.default;
                return [4 /*yield*/, (0, getConfig_1.default)(argv.enableStatic !== undefined, argv.output, argv.ignorePath, suffix)];
            case 4:
                _b = _c.apply(void 0, [_d.apply(void 0, [_e.sent()])]);
                _e.label = 5;
            case 5:
                _a = _b;
                _e.label = 6;
            case 6:
                _a;
                return [2 /*return*/];
        }
    });
}); };
exports.run = run;
//# sourceMappingURL=cli.js.map