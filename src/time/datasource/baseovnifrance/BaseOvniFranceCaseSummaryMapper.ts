import { CaseMapper } from "../CaseMapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { RR0Context } from "../../../RR0Context.js"
import { TimeContext } from "@rr0/time"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase.js"

/**
 * Maps a Base OVNI France CSV case to a Base OVNI France case.
 */
export class BaseOvniFranceCaseSummaryMapper implements CaseMapper<RR0Context, BaseOvniFranceCase, BaseOvniFranceCaseSummary> {

  constructor(readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: RR0Context, csvCase: BaseOvniFranceCase, sourceTime: Date): BaseOvniFranceCaseSummary {
    const caseNumber = csvCase["Num cas"]
    const dateFields = csvCase["Date"].split("-")
    const timeFields = csvCase["Heure"].split(":")
    let dayField = dateFields[0]
    const dayOfMonth = dayField && dayField !== "00" ? parseInt(dayField, 10) : undefined
    const c: BaseOvniFranceCaseSummary = {
      id: caseNumber,
      url: new URL("listgen.php?typlist=20&page=0&numobs=" + caseNumber, this.baseUrl).href,
      city: csvCase.Ville,
      depCode: csvCase["Départ."],
      time: new TimeContext(parseInt(dateFields[2], 10), parseInt(dateFields[1], 10), dayOfMonth,
        parseInt(timeFields[0], 10), parseInt(timeFields[1], 10), "GMT+1"),
      physicalEffect: Boolean(csvCase["Effet Physique"]),
      witnessEffect: Boolean(csvCase["Effet témoin"]),
      entities: csvCase["Nbre entité"] > 0,
      landing: Boolean(csvCase["Atter"])
    }
    return c
  }
}
