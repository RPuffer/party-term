'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ENABLED = false;
class StatusBarItem {
    constructor() {
        this.activate = () => {
            this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
            this.statusBarItem.show();
        };
        this.dispose = () => {
            if (!this.statusBarItem) {
                return;
            }
            this.statusBarItem.dispose();
            this.statusBarItem = null;
        };
        this.onPowermodeStart = (combo) => {
            // Do nothing
        };
        this.onPowermodeStop = (combo) => {
            // Do nothing
        };
        this.onComboStart = (combo) => {
            this.updateStatusBar(combo);
        };
        this.onComboStop = (combo) => {
            this.updateStatusBar(combo);
        };
        this.onDidChangeTextDocument = (combo, powermode, event) => {
            this.updateStatusBar(combo, powermode);
        };
        this.onDidChangeConfiguration = (config) => {
            // Do nothing
        };
        this.updateStatusBar = (combo, powermode) => {
            if (!this.statusBarItem) {
                return;
            }
            const prefix = powermode ? 'POWER MODE!!! ' : '';
            this.statusBarItem.text = `${prefix}Combo: ${combo}`;
        };
    }
}
exports.StatusBarItem = StatusBarItem;
//# sourceMappingURL=status-bar-item.js.map