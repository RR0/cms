import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { UfoSearchCase } from "./UfoSearchCase.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { NamedPlace, RR0CaseSummary } from "../rr0/index.js"
import { TimeContext } from "@rr0/time"
import { CityService } from "../../../org/index.js"
import { Source } from "@rr0/data/dist/source"

export class UfoSearchCaseRR0Mapper implements CaseMapper<HtmlRR0Context, UfoSearchCase, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: string, readonly copyright: string,
              readonly authors: string[]) {
  }

  getDescription(c: UfoSearchCase): string {
    const description = ["observation"]
    return description.join(" ")
  }

  map(context: HtmlRR0Context, sourceCase: UfoSearchCase, sourceTime: Date): RR0CaseSummary {
    const authors = this.authors
    const url = sourceCase.url
    const title = "cas n° " + sourceCase.id
    const publication = {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    const caseSource: Source = {url, title, authors, publication, events: [], previousSourceRefs: []}
    const placeName = sourceCase.location
    const place = placeName ? this.getPlace(context, placeName) : undefined
    return {
      id: sourceCase.id,
      type: "sighting",
      url,
      events: [],
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0Context, placeName: string): NamedPlace {
    const org = this.cityService.find(context, placeName, undefined)
    assert.ok(org, `Could not find place "${placeName}"}"`)
    return {name: org.getMessages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}
