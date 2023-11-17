
// Import the cds facade object (https://cap.cloud.sap/docs/node.js/cds-facade)
const cds = require('@sap/cds')

// The service implementation with all service handlers
module.exports = cds.service.impl(async function() {

    // Define constants for the Risk and BusinessPartner entities from the risk-service.cds file
    // const { LibFolder } = this.entities;

    // This handler will be executed directly AFTER a READ operation on RISKS
    // With this we can loop through the received data set and manipulate the single risk entries
    this.on("READ", "HandlerFolder", async (req, next) => {
        const aResult = await next()
        aResult.push({
            ID: "20466921-7d57-4e76-b14c-e53fd97dcb20",
            name: "Import from handlers/ by default"
        })
    })

  });