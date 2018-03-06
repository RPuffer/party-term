"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opn = require("opn");
function browseAzurePortal(context) {
    if (context) {
        const tenantId = context.subscription.tenantId;
        const session = context.azureAccount.sessions.find((s, i, array) => s.tenantId.toLowerCase() === tenantId.toLowerCase());
        let url = `${session.environment.portalUrl}/${tenantId}/#resource${context.registry.id}`;
        if (context.contextValue === 'azureImageNode' || context.contextValue === 'azureRepositoryNode') {
            url = `${url}/repository`;
        }
        opn(url);
    }
}
exports.browseAzurePortal = browseAzurePortal;
//# sourceMappingURL=azureUtils.js.map