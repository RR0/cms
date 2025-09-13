import { describe, expect, test } from "@javarome/testscript"
import { CaseSummaryRenderer } from "./CaseSummaryRenderer.js"
import { cmsTestUtil } from "../test/index.js"
import { HttpSource, RR0CaseSummary } from "./datasource/index.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { SourceFactory, SourceRenderer } from "../source/index.js"
import { NoteFileCounter, NoteRenderer } from "../note/index.js"
import { HautsDeSeineCityCode } from "../org/eu/fr/region/idf/92/HautsDeSeineCityCode.js"
import { AllDataService, RR0SourceType, Source } from "@rr0/data"
import { Place } from "@rr0/place"
import { OrganizationPlace } from "../place/OrganizationPlace.js"
import { hautsDeSeine } from "../org/eu/fr/region/idf/92/HautsDeSeine.js"
import { City } from "../org/country/region/department/city/City.js"

describe("TimeEventRenderer", () => {

  const dataService = new AllDataService([])
  const baseUrl = "https://rr0.org"
  const http = new HttpSource()
  const sourceFactory = new SourceFactory(dataService, http, baseUrl, cmsTestUtil.intlOptions,
    cmsTestUtil.time.getService())
  const renderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
    new SourceRenderer(cmsTestUtil.time.timeTextBuilder), cmsTestUtil.time.timeElementFactory)

  test("render event", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    const city = City.create(String(HautsDeSeineCityCode.Nanterre), hautsDeSeine,
      Place.fromLocation(48.891944, 2.207222))
    const namedPlace = new OrganizationPlace(city)
    const sourceMonth = 12
    const unreacheableSource: Source<RR0SourceType> = {
      events: [], previousSourceRefs: [],
      url: "https://somesite.com/case1",
      title: "Case 1",
      authors: ["Some Author"],
      publication: {
        publisher: "Some site",
        time: EdtfDate.fromDate(new Date(2001, sourceMonth - 1, 13))
      }
    }
    const sources = [unreacheableSource]
    const c: RR0CaseSummary = {
      events: [],
      type: "event",
      eventType: "sighting",
      time: context.time.date,
      place: namedPlace,
      description: "some sighting",
      sources
    }
    const outDoc = context.file.document
    const elem = outDoc.createElement("li")
    await renderer.render(context, c, elem)
    expect(elem.innerHTML).toBe(
      `<span class="time-resolved">en <time datetime="1970-03">mars 1970</time></span> À <span class="place">Nanterre (Hauts-de-Seine (Île-de-France (France)))</span>, some sighting <span class="source"><span class="people">Some Author</span>&nbsp;: <a href="https://somesite.com/case1">Case 1</a>, <i>Some site</i>, jeudi 13 décembre 2001</span>.`)
  })
})
