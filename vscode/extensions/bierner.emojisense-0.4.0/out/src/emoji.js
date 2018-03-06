"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmojiProvider {
    constructor() {
        this._emojiMap = null;
    }
    get emojis() {
        return this.emojiMap.values();
    }
    lookup(name) {
        return this.emojiMap.get(name.toLowerCase());
    }
    get emojiMap() {
        if (!this._emojiMap) {
            const gemoji = require('gemoji');
            this._emojiMap = new Map();
            for (const key of Object.keys(gemoji.name)) {
                const entry = gemoji.name[key];
                for (const name of entry.names) {
                    if (!this._emojiMap.has(name)) {
                        this._emojiMap.set(name, { name, emoji: entry.emoji });
                    }
                }
            }
        }
        return this._emojiMap;
    }
}
exports.EmojiProvider = EmojiProvider;
//# sourceMappingURL=emoji.js.map