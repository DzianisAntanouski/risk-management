using {riskmanagement as rm} from '../db/schema';

// using an external service from SAP S/4HANA Cloud
using {API_BUSINESS_PARTNER as external} from '../srv/external/API_BUSINESS_PARTNER.csn';
using {NorthWind as external_N} from './external/NorthWind.csn';

@readonly
entity Airlines as projection on external_N.Airlines {
    key AirlineCode, Name
};

entity BusinessPartners as projection on external.A_BusinessPartner {
    key BusinessPartner,
        BusinessPartnerFullName as FullName,
}

@path: 'service/risk'
service RiskService {
    entity Risks       as projection on rm.Risks;
    annotate Risks with @odata.draft.enabled;

    entity Mitigations as projection on rm.Mitigations;
    annotate Mitigations with @odata.draft.enabled;

    // BusinessPartner
    @readonly entity BusinessPartners as projection on rm.BusinessPartners;
    @readonly entity Airlines as projection on rm.NorthWind;
}
