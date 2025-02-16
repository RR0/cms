import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { geipanHttpDatasource } from "./GeipanRR0Mapping.js"
import { GeipanCaseClassification, GeipanCaseClassification_calc } from "./GeipanCaseClassification.js"
import { GeipanZoneType } from "./GeipanCase.js"
import { FranceDepartementCode } from "../../../region/FranceDepartementCode.js"
import { Level2Date as EdtfDate } from "@rr0/time"

export const geipanTestCaseSummaries: GeipanCaseSummary[] = [
  {
    id: "1977-03-00399",
    url: new URL(
      "fr/cas/1977-03-00399?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing1977-03-00399",
      geipanHttpDatasource.baseUrl).href,
    city: "BELLEVILLE-SUR-SAONE",
    zoneType: GeipanZoneType.Department,
    zoneCode: FranceDepartementCode.Rhone,
    time: new EdtfDate({year: 1977, month: 3, day: 19}),
    postTime: new EdtfDate({year: 2010, month: 8, day: 6}),
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
    time: new EdtfDate({year: 1977, month: 3}),
    postTime: new EdtfDate({year: 2011, month: 5, day: 18}),
    classification: GeipanCaseClassification.Identified as GeipanCaseClassification_calc
  }
]
