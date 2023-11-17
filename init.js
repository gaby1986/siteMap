window.addEventListener("load", function() {
SalesforceInteractions.init({
    cookieDomain: "cronista.com",
}).then(() => {
    const sitemapConfig = {
        global: {
            onActionEvent: (actionEvent) => {
                url = window.location.href
                if (email) {
                    actionEvent.user = actionEvent.user || {};
                    actionEvent.user.attributes = actionEvent.user.attributes || {};
                    actionEvent.user.identities = actionEvent.user.identities || {};
                    actionEvent.user.attributes.URL || {};
                    actionEvent.user.attributes.contentZones || {};
                    actionEvent.user.attributes.emailAddress = email;
                    actionEvent.user.attributes.isSuscription = isSuscriber;
                    actionEvent.user.attributes.name = userName;
                    actionEvent.user.attributes.lastName = userName;
                    actionEvent.user.attributes.date = dateTime
                    actionEvent.user.identities.userIdCms = idUser;
                }
                return actionEvent;
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

