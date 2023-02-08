"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCache = void 0;
var path_1 = __importDefault(require("path"));
var createNuxtTemplate_1 = require("./createNuxtTemplate");
var createStaticTemplate_1 = require("./createStaticTemplate");
var createNextTemplate_1 = require("./nextjs/createNextTemplate");
var prevPagesText = '';
var prevStaticText = '';
var resetCache = function () {
    prevPagesText = '';
    prevStaticText = '';
};
exports.resetCache = resetCache;
exports.default = (function (_a, mode) {
    var type = _a.type, input = _a.input, staticDir = _a.staticDir, output = _a.output, ignorePath = _a.ignorePath, suffix = _a.suffix, trailingSlash = _a.trailingSlash, basepath = _a.basepath, pageExtensions = _a.pageExtensions, appDir = _a.appDir;
    var emptyPathRegExp = /\n.+{\n+ +}.*/;
    if (mode !== 'static') {
        var text = '';
        switch (type) {
            case 'nextjs':
                text = (0, createNextTemplate_1.createNextTemplate)(input, output, ignorePath, suffix, appDir, pageExtensions);
                break;
            case 'nuxtjs':
                text = (0, createNuxtTemplate_1.createNuxtTemplate)(input, output, ignorePath, suffix, trailingSlash);
                break;
        }
        while (emptyPathRegExp.test(text)) {
            text = text.replace(emptyPathRegExp, '');
        }
        prevPagesText = text;
    }
    if (staticDir && mode !== 'pages') {
        var text = (0, createStaticTemplate_1.createStaticTemplate)(staticDir, basepath, ignorePath, suffix);
        while (emptyPathRegExp.test(text)) {
            text = text.replace(emptyPathRegExp, '');
        }
        prevStaticText = text;
    }
    return {
        text: "".concat(prevPagesText).concat(prevStaticText).concat(type === 'nuxtjs'
            ? "\ndeclare module 'vue/types/vue' {\n  interface Vue {\n    $pagesPath: PagesPath".concat(prevStaticText ? '\n    $staticPath: StaticPath' : '', "\n  }\n}\n\ndeclare module '@nuxt/types' {\n  interface NuxtAppOptions {\n    $pagesPath: PagesPath").concat(prevStaticText ? '\n    $staticPath: StaticPath' : '', "\n  }\n\n  interface Context {\n    $pagesPath: PagesPath").concat(prevStaticText ? '\n    $staticPath: StaticPath' : '', "\n  }\n}\n\ndeclare module 'vuex/types/index' {\n  interface Store<S> {\n    $pagesPath: PagesPath").concat(prevStaticText ? '\n    $staticPath: StaticPath' : '', "\n  }\n}\n\nconst pathPlugin: Plugin = (_, inject) => {\n  inject('pagesPath', pagesPath)").concat(prevStaticText ? "\n  inject('staticPath', staticPath)" : '', "\n}\n\nexport default pathPlugin\n")
            : ''),
        filePath: path_1.default.posix.join(output, '$path.ts')
    };
});
//# sourceMappingURL=buildTemplate.js.map