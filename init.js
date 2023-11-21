window.addEventListener("load", function() {
SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {
    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                return GlobalActions(actionEvent);
            },
            contentZones: GenerateContentZones(globalZones),
            listeners: GenerateListeners("Global", globalListeners),
        },
        pageTypeDefault: {
            name: "default",
            interaction: {
                name: "Default Page",
            }
        },
        pageTypes: Pages()
    };
    SalesforceInteractions.initSitemap(sitemapConfig);
});
});

