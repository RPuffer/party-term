"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers = require("./../helpers");
const index_1 = require("../icons/index");
/** Restore all configurations to default. */
exports.restoreDefaultConfig = () => {
    const defaultOptions = index_1.getDefaultIconOptions();
    helpers.setThemeConfig('activeIconPack', defaultOptions.activatedPack, true);
    helpers.setThemeConfig('folders.theme', defaultOptions.folderTheme, true);
    helpers.setThemeConfig('folders.color', defaultOptions.folderColor, true);
    helpers.setThemeConfig('hidesExplorerArrows', defaultOptions.hidesExplorerArrows, true);
    helpers.setThemeConfig('files.associations', defaultOptions.fileAssociations, true);
    helpers.setThemeConfig('folders.associations', defaultOptions.folderAssociations, true);
    helpers.setThemeConfig('languages.associations', defaultOptions.languageAssociations, true);
};
//# sourceMappingURL=restoreConfig.js.map