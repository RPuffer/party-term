"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const EmojiCompletionProvider_1 = require("./EmojiCompletionProvider");
const emoji_1 = require("./emoji");
const configuration_1 = require("./configuration");
const DecoratorProvider_1 = require("./DecoratorProvider");
function registerProviders(provider, config) {
    const disposables = [];
    for (const language of config.languages) {
        if (config.shouldShowOnColon(language)) {
            disposables.push(vscode.languages.registerCompletionItemProvider(language, provider, ':'));
        }
        else {
            disposables.push(vscode.languages.registerCompletionItemProvider(language, provider));
        }
    }
    return vscode.Disposable.from(...disposables);
}
function activate(context) {
    const emoji = new emoji_1.EmojiProvider();
    const config = new configuration_1.default();
    const provider = new EmojiCompletionProvider_1.default(emoji, config);
    let providerSub = registerProviders(provider, config);
    vscode.workspace.onDidChangeConfiguration(() => {
        config.updateConfiguration();
        providerSub.dispose();
        providerSub = registerProviders(provider, config);
    }, null, context.subscriptions);
    context.subscriptions.push(new DecoratorProvider_1.default(emoji, config));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map