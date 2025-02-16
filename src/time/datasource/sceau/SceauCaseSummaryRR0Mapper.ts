import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "../rr0/index.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CityService } from "../../../org/index.js"
import { Source } from "@rr0/data"
import { OrganizationPlace } from "../../../place/OrganizationPlace"

/**
 * Maps SCEAU cases to RR0 cases.
 */
export class SceauCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0Context, SceauCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
  }

  map(context: HtmlRR0Context, sourceCase: SceauCaseSummary, sourceTime: Date): RR0CaseSummary {
    const id = sourceCase.id
    const source: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {
        publisher: this.copyright,
        time: new EdtfDate({
          year: sourceTime.getFullYear(),
          month: sourceTime.getMonth(),
          day: sourceTime.getDate(),
          hour: sourceTime.getHours(),
          minute: sourceTime.getSeconds()
        })
      }
    }
    const cityName = sourceCase.ville
    const city = this.cityService.find(context, cityName, undefined)
    assert.ok(city, `Could not find city "${cityName}" for case ${id} at ${sourceCase.dateCas}`)
    const place = new OrganizationPlace(city)
    return {
      type: "event",
      eventType: "sighting",
      events: [],
      id,
      time: EdtfDate.fromString(sourceCase.dateCas),
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
