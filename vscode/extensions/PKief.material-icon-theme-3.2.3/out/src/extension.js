'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const i18n = require("./i18n");
const commands = require("./commands");
const start_1 = require("./messages/start");
const change_detection_1 = require("./helpers/change-detection");
const versioning_1 = require("./helpers/versioning");
exports.activate = (context) => {
    i18n.initTranslations().then(() => {
        start_1.showStartMessages(versioning_1.checkThemeStatus(context.globalState));
    }).catch(err => console.error(err));
    context.subscriptions.push(...commands.commands);
    change_detection_1.detectConfigChanges().catch(e => {
        console.error(e);
    });
    change_detection_1.watchForConfigChanges();
};
exports.deactivate = () => {
};
//# sourceMappingURL=extension.js.map