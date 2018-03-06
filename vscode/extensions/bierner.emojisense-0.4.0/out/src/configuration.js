"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Configuration {
    constructor() {
        this.updateConfiguration();
    }
    get languages() {
        return this.languageConfigurations.keys();
    }
    areUnicodeCompletionsEnabled(forLanguage) {
        return this.is('unicodeCompletionsEnabled', forLanguage);
    }
    areMarkupCompletionsEnabled(forLanguage) {
        return this.is('markupCompletionsEnabled', forLanguage);
    }
    shouldShowOnColon(forLanguage) {
        return this.is('showOnColon', forLanguage);
    }
    isInlineEnabled(forLanguage) {
        return this.is('emojiDecoratorsEnabled', forLanguage);
    }
    is(setting, forLanguage) {
        const languageConfig = this.getLanguageConfig(forLanguage);
        if (!languageConfig) {
            return false;
        }
        return typeof languageConfig[setting] !== 'undefined' ? !!languageConfig[setting] : this[setting];
    }
    getLanguageConfig(languageId) {
        return this.languageConfigurations.get(languageId);
    }
    updateConfiguration() {
        const config = vscode.workspace.getConfiguration('emojisense');
        this.unicodeCompletionsEnabled = config.get('unicodeCompletionsEnabled', true);
        this.markupCompletionsEnabled = config.get('markupCompletionsEnabled', true);
        this.showOnColon = config.get('showOnColon', true);
        this.emojiDecoratorsEnabled = config.get('emojiDecoratorsEnabled', true);
        this.languageConfigurations = new Map();
        const languagesConfig = config.get('languages', {});
        for (const language of Object.keys(languagesConfig || {})) {
            const config = languagesConfig[language];
            if (typeof config === 'boolean') {
                if (config) {
                    this.languageConfigurations.set(language, {});
                }
            }
            else {
                this.languageConfigurations.set(language, config);
            }
        }
    }
}
exports.default = Configuration;
//# sourceMappingURL=configuration.js.map