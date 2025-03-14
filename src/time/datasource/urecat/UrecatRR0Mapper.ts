import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { UrecatCase } from "./UrecatCase.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { CityService } from "../../../org/country/index.js"
import { RR0SourceType, Source } from "@rr0/data"
import { OrganizationPlace } from "../../../place/OrganizationPlace.js"
import { CountryService } from "../../../org/country/CountryService.js"

export class UrecatRR0Mapper implements CaseMapper<HtmlRR0Context, UrecatCase, RR0CaseSummary> {

  constructor(
    protected cityService: CityService, protected countryService: CountryService,
    readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  getDescription(c: UrecatCase): string {
    const description = ["observation"]
    return description.join(", ")
  }

  map(context: HtmlRR0Context, sourceCase: UrecatCase, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source<RR0SourceType> = {
      events: [], previousSourceRefs: [],
      url: sourceCase.url, title: "cas n° " + sourceCase.id, authors: this.authors,
      publication: {publisher: this.copyright, time: EdtfDate.fromDate(sourceTime)}
    }
    const location = sourceCase.basicInfo.base.location
    let sourceCountry = location.country
    assert.ok(sourceCountry, `URECAT country is ${sourceCountry}`)
    const fromPrefix = "depuis "
    if (sourceCountry.startsWith(fromPrefix)) {
      sourceCountry = sourceCountry.substring(fromPrefix.length)
    }
    const country = this.countryService.find(context, sourceCountry, undefined)
    assert.ok(country, `Could not find country "${sourceCountry}"`)
    const placeItems = /(.+?)(:?\s+\((.+)\))?$/.exec(location.placeName)
    const placeName = placeItems[1]
    const city = this.cityService.find(context, placeName, undefined)
    assert.ok(city,
      `Could not find city of name "${placeName}" in state "${location.departmentOrState}" of country "${sourceCountry}"`)
    const place = new OrganizationPlace(city)
    return {
      type: "event",
      eventType: "sighting",
      id: sourceCase.id,
      url: sourceCase.url,
      events: [],
      time: sourceCase.basicInfo.base.sightingDate,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }
}
