"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const moment = require("moment");
const nodeBase_1 = require("./nodeBase");
const utils_1 = require("../utils/utils");
class ImageNode extends nodeBase_1.NodeBase {
    constructor(label, contextValue, eventEmitter) {
        super(label);
        this.label = label;
        this.contextValue = contextValue;
        this.eventEmitter = eventEmitter;
    }
    getTreeItem() {
        let displayName = this.label;
        if (vscode.workspace.getConfiguration('docker').get('truncateLongRegistryPaths', false)) {
            if (/\//.test(displayName)) {
                let parts = this.label.split(/\//);
                displayName = utils_1.trimWithElipsis(parts[0], vscode.workspace.getConfiguration('docker').get('truncateMaxLength', 10)) + '/' + parts[1];
            }
        }
        displayName = `${displayName} (${moment(new Date(this.imageDesc.Created * 1000)).fromNow()})`;
        return {
            label: `${displayName}`,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            contextValue: "localImageNode",
            iconPath: {
                light: path.join(__filename, '..', '..', '..', '..', 'images', 'light', 'application.svg'),
                dark: path.join(__filename, '..', '..', '..', '..', 'images', 'dark', 'application.svg')
            }
        };
    }
}
exports.ImageNode = ImageNode;
//# sourceMappingURL=imageNode.js.map