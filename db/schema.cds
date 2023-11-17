
namespace riskmanagement;

using {
        managed,
        cuid,
        User,
        sap.common.CodeList
} from '@sap/cds/common';

entity Risks : cuid, managed {
        title                    : String(100);
        owner                    : String;
        prio                     : Association to Priority;
        descr                    : String;
        miti                     : Association to Mitigations;
        impact                   : Integer;
        bp : Association to BusinessPartners; // <-- uncomment this line
        virtual criticality      : Integer;
        virtual PrioCriticality : Integer;
}


entity Mitigations : cuid, managed {
        descr    : String;
        owner    : String;
        timeline : String;
        risks    : Association to many Risks
                           on risks.miti = $self;
}

entity Priority : CodeList {
        key code : String enum {
                    high   = 'H';
                    medium = 'M';
                    low    = 'L';
            };
}

// using an external service from SAP S/4HANA Cloud
using { API_BUSINESS_PARTNER as external } from '../srv/external/API_BUSINESS_PARTNER.csn';
using {NorthWind as external_N} from '../srv/external/NorthWind.csn';

entity BusinessPartners as projection on external.A_BusinessPartner {
   key BusinessPartner,
   BusinessPartnerFullName as FullName,
}

entity NorthWind as projection on external_N.Airlines {
   key AirlineCode, Name
}

entity LibFolder : cuid {
        name: String;
}

entity HandlerFolder : cuid {
        name: String;
}

entity customSrv : cuid {
        name: String;
}
