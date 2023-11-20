const { read, isfile } = cds.utils

class RiskServiceEvent {
    
    async onReadAirlines(req, NorthWindSrv) {
        // check custom property
        const sFilePath = isfile ('package.json')
        const oJsonData = await read(sFilePath)
        

		const result = await NorthWindSrv.tx(req).run(req.query)
        console.log(result)
        result.push({ AirlineCode: "Instruction", Name: "Open metadata file, then save it into the project in format <name>.edmx, then in console write cds import <path to your file> , so this comand add require to the package.json, and create CSN file in external folder, then define entity in db, after than define entity in service, after add custom handler into the js file" });
        if(oJsonData.cds.custom.addPlusAirlineCode) {
            result.map(oAirline => oAirline.AirlineCode += "+")
        }
        return result
    }

    afterReadRisk (data) {
        // Convert to array, if it's only a single risk, so that the code won't break here
        const risks = Array.isArray(data) ? data : [data];
    
        // Looping through the array of risks to set the virtual field 'criticality' that you defined in the schema
        risks.forEach((risk) => {
            if( risk.impact >= 100000) {
                risk.criticality = 1;
            } else {
                risk.criticality = 2;
            }

            // set criticality for priority
            switch (risk.prio_code) {
                case 'H':
                    risk.PrioCriticality = 1;
                    break;
                case 'M':
                    risk.PrioCriticality = 2;
                    break;
                case 'L':
                    risk.PrioCriticality = 3;
                    break;
                default:
                    break;
            }

        })
    }

    async onReadBusinessPartners(req, BPsrv) {
        // The API Sandbox returns alot of business partners with empty names.
        // We don't want them in our application
        req.query.where("LastName <> '' and FirstName <> '' ");
        
        return await BPsrv.transaction(req).send({
            query: req.query,
            headers: {
                apikey: process.env.apikey,
            },
        });
    }

    async onReadRisk(req, next) {
        /*
         Check whether the request wants an "expand" of the business partner
         As this is not possible, the risk entity and the business partner entity are in different systems (SAP BTP and S/4 HANA Cloud), 
         if there is such an expand, remove it
       */
         if (!req.query.SELECT.columns) return next();

         const expandIndex = req.query.SELECT.columns.findIndex(
             ({ expand, ref }) => expand && ref[0] === "bp"
         );
 
         if (expandIndex < 0) return next();
 
         // Remove expand from query
         req.query.SELECT.columns.splice(expandIndex, 1);
 
         // Make sure bp_BusinessPartner (ID) will be returned
         if (!req.query.SELECT.columns.find((column) =>
             column.ref.find((ref) => ref == "bp_BusinessPartner")
         )
         ) {
             req.query.SELECT.columns.push({ ref: ["bp_BusinessPartner"] });
         }
 
         const risks = await next();
 
         const asArray = x => Array.isArray(x) ? x : [x];
 
         // Request all associated BusinessPartners
         const bpIDs = asArray(risks).map(risk => risk.bp_BusinessPartner);
         const busienssPartners = await BPsrv.transaction(req).send({
             query: SELECT.from(this.entities.BusinessPartners).where({ BusinessPartner: bpIDs }),
             headers: {
                 apikey: process.env.apikey,
             }
         });
 
         // Convert in a map for easier lookup
         const bpMap = {};
         for (const businessPartner of busienssPartners)
             bpMap[businessPartner.BusinessPartner] = businessPartner;
 
         // Add BusinessPartners to result
         for (const note of asArray(risks)) {
             note.bp = bpMap[note.bp_BusinessPartner];
         }
         
         return risks;
    }
}

module.exports = new RiskServiceEvent()