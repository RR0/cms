import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { BaseOvniFranceHttpDatasource } from "./BaseOvniFranceHttpDatasource.js"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { TimeContext } from "@rr0/time"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import { baseOvniFranceDatasource, baseOvniFranceRR0Mapper } from "./BaseOvniFranceRR0Mapping.js"
import { leMans72 } from "../../../org/eu/fr/region/pdl/72/LeMans/LeMans.js"
import { lyon69 } from "../../../org/eu/fr/region/ara/69/Lyon/Lyon.js"
import { briancon05 } from "../../../org/eu/fr/region/pac/05/briancon/Briancon.js"
import { chambonSurVoueize23 } from "../../../org/eu/fr/region/naq/23/Chambon/Chambon.js"
import { RR0CaseSummary } from "../rr0"
import { Source } from "@rr0/data/dist/source"

function expectedSource(datasource: BaseOvniFranceHttpDatasource, dataDate: Date, caseNumber: string): Source {
  const url = new URL(datasource.searchPath + "?typlist=20&page=0&numobs=" + caseNumber, datasource.baseUrl).href
  return {
    previousSourceRefs: [], events: [],
    url, title: "cas n° " + caseNumber, authors: datasource.authors,
    publication: {publisher: datasource.copyright, time: TimeContext.fromDate(dataDate)}
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
        type: "sighting",
        events: [],
        time: new TimeContext(nativeCase1Time.getYear(), nativeCase1Time.getMonth(), nativeCase1Time.getDayOfMonth(),
          nativeCase1Time.getHour(), nativeCase1Time.getMinutes(), nativeCase1Time.getTimeZone()),
        place: {name: "Le Mans", place: leMans72.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase1.id)]
      },
      {
        type: "sighting",
        events: [],
        time: new TimeContext(nativeCase2Time.getYear(), nativeCase2Time.getMonth(), nativeCase2Time.getDayOfMonth(),
          nativeCase2Time.getHour(), nativeCase2Time.getMinutes(), nativeCase2Time.getTimeZone()),
        place: {name: "Lyon", place: lyon69.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase2.id)]
      },
      {
        type: "sighting",
        events: [],
        time: new TimeContext(nativeCase3Time.getYear(), nativeCase3Time.getMonth(), nativeCase3Time.getDayOfMonth(),
          nativeCase3Time.getHour(), nativeCase3Time.getMinutes(), nativeCase3Time.getTimeZone()),
        place: {name: "Briançon", place: briancon05.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase3.id)]
      },
      {
        type: "sighting",
        events: [],
        time: new TimeContext(nativeCase4Time.getYear(), nativeCase4Time.getMonth(), nativeCase4Time.getDayOfMonth(),
          nativeCase4Time.getHour(), nativeCase4Time.getMinutes(), nativeCase4Time.getTimeZone()),
        place: {name: "Chambon-sur-Voueize", place: chambonSurVoueize23.places[0]},
        description: "observation",
        sources: [expectedSource(baseOvniFranceDatasource, dataDate, nativeCase4.id)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
