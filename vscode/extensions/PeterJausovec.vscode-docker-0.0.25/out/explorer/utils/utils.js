"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function trimWithElipsis(str, max = 10) {
    const elipsis = "...";
    const len = str.length;
    if (max <= 0 || max >= 100)
        return str;
    if (str.length <= max)
        return str;
    if (max < 3)
        return str.substr(0, max);
    const front = str.substr(0, (len / 2) - (-0.5 * (max - len - 3)));
    const back = str.substr(len - (len / 2) + (-0.5 * (max - len - 3)));
    return front + elipsis + back;
}
exports.trimWithElipsis = trimWithElipsis;
/**
 * Returns a node module installed with VSCode, or null if it fails.
 */
function getCoreNodeModule(moduleName) {
    try {
        return require(`${vscode.env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) { }
    try {
        return require(`${vscode.env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) { }
    return null;
}
exports.getCoreNodeModule = getCoreNodeModule;
//# sourceMappingURL=utils.js.map