"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode = require("vscode");
const dockerExtension_1 = require("../dockerExtension");
const telemetry_1 = require("../telemetry/telemetry");
const teleCmdId = 'vscode-docker.compose.'; // we append up or down when reporting telemetry
function getDockerComposeFileUris(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield vscode.workspace.findFiles(new vscode.RelativePattern(folder, dockerExtension_1.COMPOSE_FILE_GLOB_PATTERN), null, 9999, null);
    });
}
function createItem(folder, uri) {
    const filePath = folder ? path.join('.', uri.fsPath.substr(folder.uri.fsPath.length)) : uri.fsPath;
    return {
        description: null,
        file: filePath,
        label: filePath,
        path: path.dirname(filePath)
    };
}
function computeItems(folder, uris) {
    const items = [];
    for (let i = 0; i < uris.length; i++) {
        items.push(createItem(folder, uris[i]));
    }
    return items;
}
function compose(command, message, dockerComposeFileUri, selectedComposeFileUris) {
    return __awaiter(this, void 0, void 0, function* () {
        let folder;
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('Docker compose can only run if VS Code is opened on a folder.');
            return;
        }
        if (vscode.workspace.workspaceFolders.length === 1) {
            folder = vscode.workspace.workspaceFolders[0];
        }
        else {
            folder = yield vscode.window.showWorkspaceFolderPick();
        }
        if (!folder) {
            return;
        }
        let selectedItems = [];
        if (dockerComposeFileUri) {
            for (let i = 0; i < selectedComposeFileUris.length; i++) {
                selectedItems.push(createItem(folder, selectedComposeFileUris[i]));
            }
        }
        else {
            const uris = yield getDockerComposeFileUris(folder);
            if (!uris || uris.length == 0) {
                vscode.window.showInformationMessage('Couldn\'t find any docker-compose files in your workspace.');
                return;
            }
            const items = computeItems(folder, uris);
            selectedItems.push(yield vscode.window.showQuickPick(items, { placeHolder: `Choose Docker Compose file ${message}` }));
        }
        if (selectedItems.length > 0) {
            const terminal = vscode.window.createTerminal('Docker Compose');
            const configOptions = vscode.workspace.getConfiguration('docker');
            const build = configOptions.get('dockerComposeBuild', true) ? '--build' : '';
            const detached = configOptions.get('dockerComposeDetached', true) ? '-d' : '';
            terminal.sendText(`cd "${folder.uri.fsPath}"`);
            selectedItems.forEach((item) => {
                terminal.sendText(command.toLowerCase() === 'up' ? `docker-compose -f ${item.file} ${command} ${detached} ${build}` : `docker-compose -f ${item.file} ${command}`);
            });
            terminal.show();
            if (telemetry_1.reporter) {
                /* __GDPR__
                   "command" : {
                      "command" : { "classification": "SystemMetaData", "purpose": "FeatureInsight" }
                   }
                 */
                telemetry_1.reporter.sendTelemetryEvent('command', {
                    command: teleCmdId + command
                });
            }
        }
    });
}
function composeUp(dockerComposeFileUri, selectedComposeFileUris) {
    compose('up', 'to bring up', dockerComposeFileUri, selectedComposeFileUris);
}
exports.composeUp = composeUp;
function composeDown(dockerComposeFileUri, selectedComposeFileUris) {
    compose('down', 'to take down', dockerComposeFileUri, selectedComposeFileUris);
}
exports.composeDown = composeDown;
//# sourceMappingURL=docker-compose.js.map