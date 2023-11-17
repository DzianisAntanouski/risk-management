using {riskmanagement as rm} from '../db/schema';

service HandlerFolder {

    entity HandlerFolder as projection on rm.HandlerFolder;

}