"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceWithUnderscore = void 0;
var replaceWithUnderscore = function (name) {
    return name.replace(/(-|\.|!| |'|\*|\(|\))/g, '_').replace(/^(\d)/, '$$$1');
};
exports.replaceWithUnderscore = replaceWithUnderscore;
//# sourceMappingURL=replaceWithUnderscore.js.map