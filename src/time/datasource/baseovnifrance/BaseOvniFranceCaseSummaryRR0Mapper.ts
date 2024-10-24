import assert from "assert"
import { CaseMapper } from "../CaseMapper.js"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { RR0CaseSummary } from "../rr0/RR0CaseSummary.js"
import { TimeContext } from "@rr0/time"
import { DepartmentService } from "../../../org/country/region/department/DepartmentService.js"
import { CityService } from "../../../org/country/index.js"
import { Source } from "../../../source/index.js"
import { NamedPlace } from "../rr0/NamedPlace"

/**
 * Maps a Base OVNI France case to a RR0 case.
 */
export class BaseOvniFranceCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0Context, BaseOvniFranceCaseSummary, RR0CaseSummary> {

  constructor(
    protected depService: DepartmentService, protected cityService: CityService,
    readonly baseUrl: URL, readonly copyright: string, readonly authors: string[]) {
  }

  map(context: HtmlRR0Context, sourceCase: BaseOvniFranceCaseSummary, sourceTime: Date): RR0CaseSummary {
    const caseSource: Source = {
      previousSourceRefs: [], events: [],
      url: sourceCase.url, title: "cas n° " + sourceCase.id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const depCode = sourceCase.depCode
    const dep = this.depService.get(depCode, undefined)
    assert.ok(dep, `Could not find department "${depCode}"`)
    const placeName = sourceCase.city
    const city = this.cityService.find(context, placeName, dep)
    assert.ok(city, `Could not find city of name "${placeName}" in department of code "${dep.id}"`)
    const place: NamedPlace = {name: city.getTitle(context), place: city.places[0]}
    return {
      type: "sighting",
      events: [],
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getDescription(c: BaseOvniFranceCaseSummary): string {
    const description = ["observation"]
    if (c.landing) {
      description.push("avec atterrissage")
    }
    if (c.entities) {
      description.push("avec entités")
    }
    if (c.physicalEffect) {
      description.push("avec effet physique")
    }
    if (c.witnessEffect) {
      description.push("avec effet sur témoin")
    }
    return description.join(", ")
  }
}
