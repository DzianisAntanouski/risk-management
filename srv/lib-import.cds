using {riskmanagement as rm} from '../db/schema';

service LibFolder {

    entity LibFolder as projection on rm.LibFolder;

}