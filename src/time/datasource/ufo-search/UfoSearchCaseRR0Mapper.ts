import assert from "assert"
import { CaseMapper } from "../CaseMapper"
import { UfoSearchCase } from "./UfoSearchCase"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { NamedPlace, RR0CaseSummary } from "../rr0"
import { TimeContext } from "../../TimeContext"
import { CityService } from "../../../org"
import { Source } from "../../../source"

export class UfoSearchCaseRR0Mapper implements CaseMapper<HtmlRR0SsgContext, UfoSearchCase, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: string, readonly copyright: string,
              readonly authors: string[]) {
  }

  getDescription(c: UfoSearchCase): string {
    const description = ["observation"]
    return description.join(" ")
  }

  map(context: HtmlRR0SsgContext, sourceCase: UfoSearchCase, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source = {
      events: [], previousSourceRefs: [],
      url: sourceCase.url, title: "cas n° " + sourceCase.id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const place = this.getPlace(context, sourceCase)
    return {
      id: sourceCase.id,
      type: "sighting",
      url: sourceCase.url,
      events: [],
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0SsgContext, sourceCase: UfoSearchCase): NamedPlace {
    const placeName = sourceCase.location
    const org = this.cityService.find(context, placeName, undefined)
    assert.ok(org, `Could not find place "${placeName}"}"`)
    return {name: org.getMessages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}