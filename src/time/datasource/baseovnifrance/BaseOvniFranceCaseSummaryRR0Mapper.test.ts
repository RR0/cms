import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import { baseOvniFranceDatasource } from "./BaseOvniFranceRR0Mapping.js"
import { leMans72 } from "../../../org/eu/fr/region/pdl/72/LeMans/LeMans.js"
import { lyon69 } from "../../../org/eu/fr/region/ara/69/Lyon/Lyon.js"
import { briancon05 } from "../../../org/eu/fr/region/pac/05/briancon/Briancon.js"
import { chambonSurVoueize23 } from "../../../org/eu/fr/region/naq/23/Chambon/Chambon.js"
import { RR0CaseSummary } from "../rr0"
import { Source } from "@rr0/data/dist/source"
import { BaseOvniFranceCaseSummaryRR0Mapper } from "./BaseOvniFranceCaseSummaryRR0Mapper"

function expectedSource(datasource: BaseOvniFranceHttpDatasource, dataDate: Date, caseNumber: string): Source {
  const url = new URL(datasource.searchPath + "?typlist=20&page=0&numobs=" + caseNumber, datasource.baseUrl).href
  return {
    previousSourceRefs: [], events: [],
    url, title: "cas n° " + caseNumber, authors: datasource.authors,
    publication: {publisher: datasource.copyright, time: EdtfDate.fromDate(dataDate)}
  }
}

describe("BaseOvniFranceCaseSource", () => {

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("map as RR0 cases", async () => {
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const baseOvniFranceRR0Mapper = new BaseOvniFranceCaseSummaryRR0Mapper(
      rr0TestUtil.departmentService, rr0TestUtil.cityService,
      baseOvniFranceDatasource.baseUrl, baseOvniFranceDatasource.copyright, baseOvniFranceDatasource.authors
    )
    const mapped = baseOvniFranceTestCases.map(sourceCase => baseOvniFranceRR0Mapper.map(context, sourceCase, dataDate))
    const nativeCase1 = baseOvniFranceTestCases[0]
    const nativeCase1Time = nativeCase1.time
    const nativeCase2 = baseOvniFranceTestCases[1]
    const nativeCase2Time = nativeCase2.time
    const nativeCase3 = baseOvniFranceTestCases[2]
    const nativeCase3Time = nativeCase3.time
    const nativeCase4 = baseOvniFranceTestCases[3]
    const nativeCase4Time = nativeCase4.time
    const expected: RR0CaseSummary[] = [
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase1Time,
        place: leMans72.places[0],
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase1.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase2Time,
        place: lyon69.places[0],
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase2.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase3Time,
        place: briancon05.places[0],
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase3.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase4Time,
        place: chambonSurVoueize23.places[0],
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase4.id)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
