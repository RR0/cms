import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CityService } from "../../../org/country/index.js"
import { Source } from "@rr0/data/dist/source"
import { OrganizationPlace } from "../../../place/OrganizationPlace"

/**
 * Maps FUFORA cases to RR0 cases.
 */
export class FuforaCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0Context, FuforaCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
  }

  map(context: HtmlRR0Context, sourceCase: FuforaCaseSummary, sourceTime: Date): RR0CaseSummary {
    const id = sourceCase.id
    const source: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {publisher: this.copyright, time: EdtfDate.fromDate(sourceTime)}
    }
    const cityName = sourceCase.city || sourceCase.sightingPlace
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${id} at ${sourceCase.dateTime}`)
    return {
      type: "event",
      eventType: "sighting",
      events: [],
      id,
      time: sourceCase.dateTime,
      place: new OrganizationPlace(city),
      description: this.getDescription(sourceCase),
      sources: [source]
    }
  }

  protected getDescription(c: FuforaCaseSummary): string {
    const description = ["observation"]
    return description.join(", ")
  }
}
