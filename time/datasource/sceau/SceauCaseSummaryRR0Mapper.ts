import assert from "assert"
import { CaseMapper } from "../CaseMapper"
import { SceauCaseSummary } from "./SceauCaseSummary"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NamedPlace, RR0CaseSummary } from "../rr0"
import { TimeContext } from "../../TimeContext"
import { Source } from "../../../source"
import { CityService } from "../../../org"

/**
 * Maps SCEAU cases to RR0 cases.
 */
export class SceauCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0SsgContext, SceauCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
  }

  map(context: HtmlRR0SsgContext, sourceCase: SceauCaseSummary, sourceTime: Date): RR0CaseSummary {
    const id = sourceCase.id
    const source: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const cityName = sourceCase.ville
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${id} at ${sourceCase.dateCas}`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "case",
      events: [],
      id,
      time: TimeContext.fromString(sourceCase.dateCas),
      place,
      description: this.getDescription(sourceCase),
      sources: [source]
    }
  }

  protected getDescription(c: SceauCaseSummary): string {
    const description = ["observation"]
    return description.join(", ")
  }
}
