
// Import the cds facade object (https://cap.cloud.sap/docs/node.js/cds-facade)
const cds = require('@sap/cds');

const RiskServiceEvent = require('./events/riskSrvHandlers')

// The service implementation with all service handlers
module.exports = cds.service.impl(async function() {

    const { Risks, BusinessPartners, Airlines } = this.entities;

    const BPsrv = await cds.connect.to("API_BUSINESS_PARTNER");
    const NorthWindSrv = await cds.connect.to('NorthWind');

    this.after("READ", Risks, async (data) => RiskServiceEvent.afterReadRisk(data));
    this.on("READ", BusinessPartners, async (req) => RiskServiceEvent.onReadBusinessPartners(req, BPsrv));
    this.on("READ", Risks, async (req, next) => RiskServiceEvent.onReadRisk(req, next));
	  this.on('READ', Airlines, async (req) => await RiskServiceEvent.onReadAirlines(req, NorthWindSrv));

  });