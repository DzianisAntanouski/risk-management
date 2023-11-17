sap.ui.define(
    ["sap/fe/core/AppComponent"],
    async function (Component) {
        "use strict";
        const response = await fetch("/odata/v4/service/risk/Risks")
        const data = await response.json()
        console.log(data)
        return Component.extend("riskmanagement.Component", {
            metadata: {
                manifest: "json"
            }
        });
        
    }
);