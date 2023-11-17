
// Import the cds facade object (https://cap.cloud.sap/docs/node.js/cds-facade)
const cds = require('@sap/cds')

// The service implementation with all service handlers
module.exports = cds.service.impl(async function() {

    // Define constants for the Risk and BusinessPartner entities from the risk-service.cds file
    const { customSrv } = this.entities;

    // This handler will be executed directly AFTER a READ operation on RISKS
    // With this we can loop through the received data set and manipulate the single risk entries
    this.on("READ", customSrv, async (req, next) => {
        const aResult = await next()
        aResult.push({
            ID: "20466921-7d57-4e76-b14c-e53fd97dcb20",
            name: "use js folowwing annotation @impl from custom place"
        })
    })

  });