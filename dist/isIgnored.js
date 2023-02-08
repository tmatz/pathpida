"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIgnored = exports.createIg = void 0;
var fs_1 = __importDefault(require("fs"));
var ignore_1 = __importDefault(require("ignore"));
var path_1 = __importDefault(require("path"));
var createIg = function (ignorePath) {
    return ignorePath === undefined ? undefined : (0, ignore_1.default)().add(fs_1.default.readFileSync(ignorePath).toString());
};
exports.createIg = createIg;
var isIgnored = function (ig, ignorePath, targetDir, file) {
    return !!(ig === null || ig === void 0 ? void 0 : ig.ignores(path_1.default.relative((ignorePath !== null && ignorePath !== void 0 ? ignorePath : '').replace(path_1.default.basename(ignorePath !== null && ignorePath !== void 0 ? ignorePath : ''), ''), path_1.default.posix.join(targetDir, file))));
};
exports.isIgnored = isIgnored;
//# sourceMappingURL=isIgnored.js.map