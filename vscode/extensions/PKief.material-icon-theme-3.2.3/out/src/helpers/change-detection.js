"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("./index");
const vscode = require("vscode");
const index_1 = require("../icons/index");
/** Watch for changes in the configurations to update the icons theme. */
exports.watchForConfigChanges = () => {
    vscode.workspace.onDidChangeConfiguration(exports.detectConfigChanges);
};
/**
 * Compare the workspace and the user configurations
 * with the current setup of the icons.
*/
exports.detectConfigChanges = () => {
    return helpers.getMaterialIconsJSON()
        .then((json) => {
        compareConfig('activeIconPack', json.options.activatedPack);
        compareConfig('folders.theme', json.options.folderTheme);
        compareConfig('folders.color', json.options.folderColor);
        compareConfig('hidesExplorerArrows', json.options.hidesExplorerArrows);
        compareConfig('files.associations', json.options.fileAssociations);
        compareConfig('folders.associations', json.options.folderAssociations);
        compareConfig('languages.associations', json.options.languageAssociations);
    });
};
const compareConfig = (config, currentState) => {
    const configValue = helpers.getThemeConfig(config).globalValue;
    return helpers.getMaterialIconsJSON().then(result => {
        if (configValue !== undefined && JSON.stringify(configValue) !== JSON.stringify(currentState)) {
            updateIconJson();
        }
    });
};
const updateIconJson = () => {
    const defaultOptions = index_1.getDefaultIconOptions();
    // adjust options
    const options = {
        folderTheme: getCurrentConfig('folders.theme', defaultOptions.folderTheme),
        folderColor: getCurrentConfig('folders.color', defaultOptions.folderColor),
        activatedPack: getCurrentConfig('activeIconPack', defaultOptions.activatedPack),
        hidesExplorerArrows: getCurrentConfig('hidesExplorerArrows', defaultOptions.hidesExplorerArrows),
        fileAssociations: getCurrentConfig('files.associations', defaultOptions.fileAssociations),
        folderAssociations: getCurrentConfig('folders.associations', defaultOptions.folderAssociations),
        languageAssociations: getCurrentConfig('languages.associations', defaultOptions.languageAssociations),
    };
    // update icon json file with new options
    return index_1.createIconFile(options).then(() => {
        helpers.promptToReload();
    }).catch(err => {
        console.error(err);
    });
};
const getCurrentConfig = (config, defaultValue) => {
    const result = helpers.getThemeConfig(config).globalValue;
    return result !== undefined ? result : defaultValue;
};
//# sourceMappingURL=change-detection.js.map