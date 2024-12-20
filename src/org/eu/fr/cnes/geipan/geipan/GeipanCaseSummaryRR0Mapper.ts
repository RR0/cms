import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import assert from "assert"
import { GeipanCaseClassification } from "./GeipanCaseClassification.js"
import { CaseMapper, NamedPlace, RR0CaseSummary } from "../../../../../../time/index.js"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { CityService } from "../../../../../country/index.js"
import { Organization } from "../../../../../Organization.js"
import { france } from "../../../France.js"
import { TimeContext } from "@rr0/time"
import { Source } from "@rr0/data/dist/source"

export class GeipanCaseSummaryRR0Mapper implements CaseMapper<HtmlRR0Context, GeipanCaseSummary, RR0CaseSummary> {

  constructor(protected cityService: CityService, readonly baseUrl: URL, readonly copyright: string,
              readonly authors: string[]) {
  }

  getDescription(c: GeipanCaseSummary): string {
    const description = ["observation"]
    switch (c.classification) {
      case GeipanCaseClassification.Identified:
        description.push("identifiée")
        break
      case GeipanCaseClassification.LikelyIdentified:
        description.push("probablement identifiée")
        break
      case GeipanCaseClassification.MissingInfo:
        description.push("inexploitable")
        break
      case GeipanCaseClassification.Unidentified1:
        description.push("non identifiée")
        break
      case GeipanCaseClassification.Unidentified2:
        description.push("non identifiée et consistante")
        break
      default:
        description.push(c.classification)
    }
    return description.join(" ")
  }

  map(context: HtmlRR0Context, sourceCase: GeipanCaseSummary, sourceTime: Date): RR0CaseSummary {
    const id = sourceCase.id
    const caseSource: Source = {
      previousSourceRefs: [],
      events: [], url: sourceCase.url, title: "cas n° " + id, authors: this.authors,
      publication: {publisher: this.copyright, time: TimeContext.fromDate(sourceTime)}
    }
    const place = this.getPlace(context, sourceCase)
    return {
      type: "sighting",
      events: [],
      id,
      time: sourceCase.time,
      place,
      description: this.getDescription(sourceCase),
      sources: [caseSource]
    }
  }

  protected getPlace(context: HtmlRR0Context, sourceCase: GeipanCaseSummary): NamedPlace {
    const depCode = sourceCase.zoneCode
    assert.ok(depCode, `Should at least have one of department,region or country code`)
    const placeItems = /(.+?)(:?\s+\(([A-Z]+)\))?(:?\s+\((\d+)\))?$/.exec(sourceCase.city)
    const prefix = placeItems[3] ? placeItems[3] + " " : ""
    const title = prefix + placeItems[1]
    let org: Organization
    if (title === "NATIONAL") {
      org = france
    } else {
      const placeName = title.replace("(DPT)", "").replace("(DEP)", "").trim()
      org = this.cityService.find(context, placeName, undefined)
      assert.ok(org,
        `Could not find city "${placeName}" in department "${depCode}" nor department with this name in country "${france.id}"`)
    }
    return {name: org.getMessages(context).toTitle(context, org, {parent: true}), org, place: org.places[0]}
  }
}
