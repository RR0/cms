import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { NuforcHttpDatasource } from "./NuforcHttpDatasource.js"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { nuforcDatasource } from "./NuforcRR0Mapping.js"
import { nuforcTestCases } from "./NuforcTestCases.js"
import { castlegar } from "../../../org/ca/region/bc/rdck/Castlegar/Castlegar.js"
import { fortWorth } from "../../../org/us/region/tx/tarrant/fortworth/FortWorth.js"
import { campPendleton } from "../../../org/us/region/ca/sandiego/camppendleton/CampPendleton.js"
import { stPetersburg } from "../../../org/us/region/fl/pinellas/stpetersburg/StPetersburg.js"
import { monessen } from "../../../org/us/region/pa/westmoreland/monessen/Monessen.js"
import { bonneyLake } from "../../../org/us/region/wa/pierce/bonneylake/BonneyLake.js"
import { slocomb } from "../../../org/us/region/al/geneva/slocomb/Slocomb.js"
import { RR0CaseSummary } from "../rr0"
import { Source } from "@rr0/data/dist/source"
import { NuforcRR0Mapper } from "./NuforcRR0Mapper"
import { OrganizationPlace } from "../../../place/OrganizationPlace"

function expectedSource(datasource: NuforcHttpDatasource, dataDate: Date, caseNumber: string): Source {
  const url = new URL("sighting/?id=" + caseNumber, datasource.baseUrl).href
  return {
    previousSourceRefs: [], events: [],
    url, title: "cas n° " + caseNumber, authors: datasource.authors,
    publication: {publisher: datasource.copyright, time: EdtfDate.fromDate(dataDate)}
  }
}

describe("NuforcRR0Mapper", () => {

  let context: HtmlRR0Context
  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch native cases", async () => {
    const items = await nuforcDatasource.fetch(context)
    expect(items).toEqual(nuforcTestCases)
  })

  test("fetch and map as RR0 cases", async () => {
    const nuforcRR0Mapper = new NuforcRR0Mapper(rr0TestUtil.cityService, rr0TestUtil.countryService,
      nuforcDatasource.baseUrl.href, nuforcDatasource.copyright, nuforcDatasource.authors)
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const testCases = nuforcTestCases.sort(
      (c1, c2) => c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0)
    const mapped = testCases.map(sourceCase => nuforcRR0Mapper.map(context, sourceCase, dataDate))
    const nativeCase1 = testCases[0]
    const nativeCase1Time = nativeCase1.time
    const nativeCase2 = testCases[1]
    const nativeCase2Time = nativeCase2.time
    const nativeCase3 = testCases[2]
    const nativeCase3Time = nativeCase3.time
    const nativeCase4 = testCases[3]
    const nativeCase4Time = nativeCase4.time
    const nativeCase5 = testCases[4]
    const nativeCase5Time = nativeCase5.time
    const nativeCase6 = testCases[5]
    const nativeCase6Time = nativeCase6.time
    const nativeCase7 = testCases[6]
    const nativeCase7Time = nativeCase7.time
    const expected: RR0CaseSummary[] = [
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase1Time,
        place: new OrganizationPlace(slocomb),
        description: nuforcRR0Mapper.getDescription(nativeCase1),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase1.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase2Time,
        place: new OrganizationPlace(castlegar),
        description: nuforcRR0Mapper.getDescription(nativeCase2),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase2.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase3Time,
        place: new OrganizationPlace(fortWorth),
        description: nuforcRR0Mapper.getDescription(nativeCase3),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase3.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase4Time,
        place: new OrganizationPlace(campPendleton),
        description: nuforcRR0Mapper.getDescription(nativeCase4),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase4.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase5Time,
        place: new OrganizationPlace(stPetersburg),
        description: nuforcRR0Mapper.getDescription(nativeCase5),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase5.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase6Time,
        place: new OrganizationPlace(monessen),
        description: nuforcRR0Mapper.getDescription(nativeCase6),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase6.id)]
      },
      {
        type: "event",
        eventType: "sighting",
        events: [],
        time: nativeCase7Time,
        place: new OrganizationPlace(bonneyLake),
        description: nuforcRR0Mapper.getDescription(nativeCase7),
        sources: [expectedSource(nuforcDatasource, dataDate, nativeCase7.id)]
      }
    ]
    expect(mapped).toEqual(expected)
  })
})
