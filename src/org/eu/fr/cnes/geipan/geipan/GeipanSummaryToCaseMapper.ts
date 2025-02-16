import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { GeipanCase } from "./GeipanCase.js"
import { CaseMapper } from "../../../../../../time/index.js"
import { RR0Context } from "../../../../../../RR0Context.js"

/**
 * Maps a GEIPAN CSV case to a GEIPAN summary case.
 */
export class GeipanSummaryToCaseMapper implements CaseMapper<RR0Context, GeipanCaseSummary, GeipanCase> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: RR0Context, csvCase: GeipanCaseSummary, sourceTime: Date): GeipanCase {
    const caseNumber = csvCase.id
    const sightingYear = csvCase.time.year?.toString()
    const sightingMonth = csvCase.time.month?.toString() ?? "--"
    const sightingDayOfMonth = csvCase.time.day?.toString() ?? "--"
    return {
      cas_classification: csvCase.classification,
      cas_consistance_calc: 0,
      cas_consistance_calc_err: 0,
      cas_etrangete_calc: 0,
      cas_etrangete_calc_err: 0,
      cas_public: true,
      cas_resume: "",
      cas_resume_web: "",
      cas_zone_nom: "",
      id_cas: 0,
      cas_numEtude: caseNumber,
      cas_nom_dossier: csvCase.city,
      cas_zone_type: csvCase.zoneType,
      cas_zone_code: csvCase.zoneCode,
      cas_AAAA: sightingYear,
      cas_MM: sightingMonth,
      cas_JJ: sightingDayOfMonth,
      cas_date_maj: csvCase.postTime.toString(),
      cas_classification_calc: csvCase.classification
    }
  }
}
