"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class APIImpl {
    constructor() {
        this._onDidRegister = new vscode.EventEmitter();
        this.onDidRegister = this._onDidRegister.event;
        this.registry = [];
    }
    registerExplorerRegistryProvider(provider) {
        this.registry.push(provider);
        this._onDidRegister.fire(provider);
    }
    activateContributingExtensions() {
        const contributingExtensions = vscode.extensions.all.filter((extension) => (typeof extension.packageJSON['PeterJausovec.vscode-docker'] !== 'undefined'));
        return Promise.all(contributingExtensions.map((extension) => extension.activate()));
    }
}
exports.APIImpl = APIImpl;
exports.API = new APIImpl();
//# sourceMappingURL=extension-api.js.map