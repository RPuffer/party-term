"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../models/index");
const index_2 = require("./index");
const fileIcons_1 = require("../fileIcons");
const folderIcons_1 = require("../folderIcons");
const languageIcons_1 = require("../languageIcons");
const constants_1 = require("./constants");
const merge = require("lodash.merge");
const path = require("path");
const fs = require("fs");
/**
 * Generate the complete icon configuration object that can be written as JSON file.
 */
exports.generateIconConfigurationObject = (options) => {
    const iconConfig = merge({}, new index_1.IconConfiguration(), { options });
    const languageIconDefinitions = index_2.getLanguageIconDefinitions(languageIcons_1.languageIcons, iconConfig, options);
    const fileIconDefinitions = index_2.getFileIconDefinitions(fileIcons_1.fileIcons, iconConfig, options);
    const folderIconDefinitions = index_2.getFolderIconDefinitions(folderIcons_1.folderIcons, iconConfig, options);
    return merge({}, languageIconDefinitions, fileIconDefinitions, folderIconDefinitions);
};
/**
 * Create the JSON file that is responsible for the icons in the editor.
 */
exports.createIconFile = (options = exports.getDefaultIconOptions()) => {
    const iconJSONPath = path.join(__dirname, '../../../', 'src', constants_1.iconJsonName);
    const json = exports.generateIconConfigurationObject(options);
    return new Promise((resolve, reject) => {
        fs.writeFile(iconJSONPath, JSON.stringify(json, null, 2), (err) => {
            if (err) {
                reject(err);
            }
            if (options.folderColor) {
                index_2.generateFolderIcons(options.folderColor).catch(e => reject(e)).then(() => {
                    resolve(constants_1.iconJsonName);
                });
            }
        });
    });
};
/**
 * The options control the generator and decide which icons are disabled or not.
 */
exports.getDefaultIconOptions = () => {
    const options = {
        folderTheme: 'specific',
        folderColor: '#90a4ae',
        activatedPack: 'angular',
        hidesExplorerArrows: false,
        fileAssociations: {},
        folderAssociations: {},
        languageAssociations: {}
    };
    return options;
};
//# sourceMappingURL=jsonGenerator.js.map