import { GeipanCaseSummary, GeipanZoneCode } from "./GeipanCaseSummary.js"
import { GeipanCase } from "./GeipanCase.js"
import { CaseMapper } from "../../../../../../time/index.js"
import { RR0Context } from "../../../../../../RR0Context.js"
import { Level2Date as EdtfDate } from "@rr0/time"

/**
 * Maps a GEIPAN CSV case to a GEIPAN summary case.
 */
export class GeipanCaseToSummaryMapper implements CaseMapper<RR0Context, GeipanCase, GeipanCaseSummary> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: RR0Context, csvCase: GeipanCase, sourceTime: Date): GeipanCaseSummary {
    const caseNumber = csvCase.cas_numEtude
    const dayField = csvCase.cas_JJ
    const sightingYear = parseInt(csvCase.cas_AAAA, 10)
    const sightingMonth = parseInt(csvCase.cas_MM, 10)
    const sightingDayOfMonth = dayField && dayField !== "--" ? parseInt(dayField, 10) : undefined
    const caseTitle = csvCase.cas_nom_dossier
    const placeEnd = caseTitle.lastIndexOf(" (")
    const city = caseTitle.substring(0, placeEnd)
    const update = csvCase.cas_date_maj.split("-")
    const postYear = parseInt(update[0], 10)
    const postMonth = parseInt(update[1], 10)
    const postDayOfMonth = parseInt(update[2], 10)
    const classification = csvCase.cas_classification_calc
    return {
      id: caseNumber,
      url: new URL(
        `https://geipan.fr/fr/cas/${caseNumber}?field_agregation_index_value=&field_date_d_observation_value%5Bmax%5D=1977%2F03%2F31&field_date_d_observation_value%5Bmin%5D=1977%2F03%2F01&field_departement_target_id=&field_document_existe_ou_pas_value=All&field_latitude_value%5Bmax%5D=&field_latitude_value%5Bmin%5D=&field_longitude_value%5Bmax%5D=&field_longitude_value%5Bmin%5D=&field_phenomene_target_id=&field_type_de_cas_target_id=All&select-category-export=nothing${caseNumber}`,
        this.baseUrl).href,
      city,
      zoneType: csvCase.cas_zone_type,
      zoneCode: csvCase.cas_zone_code as GeipanZoneCode,
      time: new EdtfDate({year: sightingYear, month: sightingMonth, day: sightingDayOfMonth}),
      postTime: new EdtfDate({year: postYear, month: postMonth, day: postDayOfMonth}),
      classification
    }
  }
}
