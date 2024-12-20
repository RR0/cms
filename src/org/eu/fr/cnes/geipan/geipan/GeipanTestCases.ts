import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { geipanHttpDatasource } from "./GeipanRR0Mapping.js"
import { GeipanCaseClassification, GeipanCaseClassification_calc } from "./GeipanCaseClassification.js"
import { GeipanZoneType } from "./GeipanCase.js"
import { FranceDepartementCode } from "../../../region/FranceDepartementCode.js"
import { TimeContext } from "@rr0/time"

export const geipanTestCaseSummaries: GeipanCaseSummary[] = [
  {
    id: "1977-03-00399",
    url: new URL(
      "fr/cas/1977-03-00399?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing1977-03-00399",
      geipanHttpDatasource.baseUrl).href,
    city: "BELLEVILLE-SUR-SAONE",
    zoneType: GeipanZoneType.Department,
    zoneCode: FranceDepartementCode.Rhone,
    time: new TimeContext(1977, 3, 19),
    postTime: new TimeContext(2010, 8, 6),
    classification: GeipanCaseClassification.MissingInfo as GeipanCaseClassification_calc
  },
  {
    id: "1977-10-00438",
    url: new URL(
      "fr/cas/1977-10-00438?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing1977-10-00438",
      geipanHttpDatasource.baseUrl).href,
    city: "ESTANG",
    zoneType: GeipanZoneType.Department,
    zoneCode: FranceDepartementCode.Gers,
    time: new TimeContext(1977, 3),
    postTime: new TimeContext(2011, 5, 18),
    classification: GeipanCaseClassification.Identified as GeipanCaseClassification_calc
  }
]
