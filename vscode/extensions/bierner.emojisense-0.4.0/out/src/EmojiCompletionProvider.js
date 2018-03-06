"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class EmojiCompletionProvider {
    constructor(emojiProvider, configuration) {
        this.emojiProvider = emojiProvider;
        this.configuration = configuration;
    }
    provideCompletionItems(document, position, _token) {
        if (position.character === 0) {
            return [];
        }
        const line = document.lineAt(position.line);
        const pre = line.text.slice(0, position.character);
        // Handle case of: `:cat:|`
        const preExistingMatch = pre.match(/:[\w\d_\+\-]+:$/);
        // If there is a character before the color, require at least one character after it
        const preMatch = preExistingMatch || pre.match(/(?:\s|^)(:(:?)$)|(:(:?)[\w\d_\+\-]+?)$/);
        if (!preMatch) {
            return [];
        }
        const post = line.text.slice(position.character);
        const postMatch = post.match(/[\w\d_\+\-]*?:?/);
        const replacementSpan = new vscode_1.Range(position.translate(0, -(preMatch[1] || preMatch[3] || '').length), postMatch ? position.translate(0, postMatch[0].length) : position);
        if (pre.length >= 2 && (preMatch[2] || preMatch[4])) {
            return this.getMarkupEmojiCompletions(document, replacementSpan);
        }
        return this.getUnicodeEmojiCompletions(document, replacementSpan)
            .concat(this.getMarkupEmojiCompletions(document, replacementSpan));
    }
    getUnicodeEmojiCompletions(document, replacementSpan) {
        if (!this.configuration.areUnicodeCompletionsEnabled(document.languageId)) {
            return [];
        }
        return Array.from(this.emojiProvider.emojis).map(x => {
            const item = new vscode_1.CompletionItem(`:${x.name}: ${x.emoji}`, vscode_1.CompletionItemKind.Text);
            item.filterText = `:${x.name}:`;
            item.documentation = new vscode_1.MarkdownString(`# ${x.emoji}`);
            item.insertText = x.emoji;
            item.range = replacementSpan;
            return item;
        });
    }
    getMarkupEmojiCompletions(document, replacementSpan) {
        if (!this.configuration.areMarkupCompletionsEnabled(document.languageId)) {
            return [];
        }
        return Array.from(this.emojiProvider.emojis).map(x => {
            const item = new vscode_1.CompletionItem(`::${x.name} ${x.emoji}`, vscode_1.CompletionItemKind.Text);
            item.filterText = `::${x.name}`;
            item.documentation = new vscode_1.MarkdownString(`# ${x.emoji}`);
            item.insertText = `:${x.name}:`;
            item.range = replacementSpan;
            return item;
        });
    }
}
exports.default = EmojiCompletionProvider;
//# sourceMappingURL=EmojiCompletionProvider.js.map