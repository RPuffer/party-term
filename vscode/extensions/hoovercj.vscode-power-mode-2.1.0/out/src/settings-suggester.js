"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const request = require("request-promise-native");
const url = 'https://api.github.com/repos/hoovercj/vscode-power-mode/issues/7/comments';
const COMMENT_PREFIX = '```json';
const COMMENT_SUFFIX = '```';
const ALLOWED_SETTINGS = [
    'powermode.comboThreshold',
    'powermode.comboTimeout',
    'powermode.enableExplosions',
    'powermode.enableShake',
    'powermode.maxExplosions',
    'powermode.explosionSize',
    'powermode.explosionFrequency',
    'powermode.explosionOffset',
    'powermode.customExplosions',
    'powermode.legacyMode',
    'powermode.explosionMode',
    'powermode.explosionDuration',
    'powermode.customCss',
];
let comments = null;
;
class SettingsSuggester {
    constructor() {
        this.settingSuggestions = true;
        this.provideCompletionItems = (document, position, token) => {
            if (!this.settingSuggestions) {
                return;
            }
            const query = document.getText(document.getWordRangeAtPosition(position));
            if ('powermode'.indexOf(query) < 0) {
                return;
            }
            return this.getComments().then(comments => {
                return comments.map(comment => {
                    const settings = Object.keys(comment.settings)
                        .filter(setting => ALLOWED_SETTINGS.indexOf(setting) >= 0)
                        .map(setting => {
                        return `"${setting}": ${JSON.stringify(comment.settings[setting])}`;
                    });
                    return {
                        label: `powermode: ${comment.label}`,
                        detail: comment.description,
                        kind: vscode.CompletionItemKind.Snippet,
                        insertText: settings.join(',\n')
                    };
                });
            });
        };
        this.getComments = () => {
            if (comments && comments.length !== 0) {
                return Promise.resolve(comments);
            }
            comments = [];
            return request(url, { headers: { 'User-Agent': 'vscode' } })
                .then(res => {
                try {
                    const rawComments = JSON.parse(res);
                    rawComments.forEach(comment => {
                        const body = comment.body.trim();
                        // Start with assumption that we'll parse the whole comment
                        let startIndex = 0;
                        let endIndex = body.length;
                        // Search for code tags
                        const startTagIndex = body.indexOf(COMMENT_PREFIX);
                        const endTagIndex = body.lastIndexOf(COMMENT_SUFFIX);
                        // If there is a starting code tag, move the start index to the end of it
                        if (startTagIndex >= 0) {
                            startIndex = startTagIndex + COMMENT_PREFIX.length;
                        }
                        // stop parsing at the ending code tag if it is after
                        // the start index or is the same as the start tag
                        if (endTagIndex >= startIndex) {
                            endIndex = endTagIndex;
                        }
                        // Extract the text
                        const settingsText = body.substring(startIndex, endIndex);
                        // if it is empty, ignore it
                        if (!settingsText) {
                            return;
                        }
                        try {
                            // Try to parse the body. If it is parseable
                            // and it has a 'settings' property, keep it
                            const settings = JSON.parse(settingsText);
                            if (settings && settings.label && settings.settings) {
                                comments.push(settings);
                            }
                        }
                        catch (e) {
                            console.error(e);
                            // ignore
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                    // ignore
                }
                return comments;
            }).catch(e => {
                console.error(e);
            });
        };
    }
}
exports.SettingsSuggester = SettingsSuggester;
//# sourceMappingURL=settings-suggester.js.map