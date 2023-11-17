using {riskmanagement as rm} from '../db/schema';

@impl: 'srv/customSrvJs/customSrv.js'
service customSrv {

    entity customSrv as projection on rm.customSrv;

}