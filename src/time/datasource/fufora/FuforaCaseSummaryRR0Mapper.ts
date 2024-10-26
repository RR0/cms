import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { TimeContext } from "@rr0/time"
import { CityService } from "../../../org/country/index.js"
import { NamedPlace } from "../rr0/NamedPlace"
import { Source } from "@rr0/data/dist/source"

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
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const cityName = sourceCase.city || sourceCase.sightingPlace
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${id} at ${sourceCase.dateTime}`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "sighting",
      events: [],
      id,
      time: sourceCase.dateTime,
      place,
      description: this.getDescription(sourceCase),
      sources: [source]
    }
  }

  protected getDescription(c: FuforaCaseSummary): string {
    const description = ["observation"]
    return description.join(", ")
  }
}
