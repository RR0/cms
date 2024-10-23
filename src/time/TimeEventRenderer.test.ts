import { describe, expect, test } from "@javarome/testscript"
import { CaseSummaryRenderer } from "./CaseSummaryRenderer.js"
import { rr0TestUtil } from "../test/index.js"
import { Place } from "../place/index.js"
import { franceCity } from "../org/eu/fr/region/FranceCity.js"
import { HttpSource, NamedPlace, RR0CaseSummary } from "./datasource/index.js"
import { TimeContext } from "@rr0/time"
import { Source, SourceFactory, SourceRenderer } from "../source/index.js"
import { NoteFileCounter, NoteRenderer } from "../note/index.js"
import { AllDataService } from "../data/index.js"
import { HautsDeSeineCityCode } from "../org/eu/fr/region/idf/92/HautsDeSeineCityCode.js"

describe("TimeEventRenderer", () => {

  const root = "src/time"
  const dataService = new AllDataService([])
  const baseUrl = "https://rr0.org"
  const http = new HttpSource()
  const sourceFactory = new SourceFactory(dataService, http, baseUrl, rr0TestUtil.intlOptions)
  const renderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
    new SourceRenderer(rr0TestUtil.time.timeTextBuilder), rr0TestUtil.time.timeElementFactory)

  test("render event", async () => {
    const context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    const city = franceCity(HautsDeSeineCityCode.Nanterre, Place.fromLocation(48.891944, 2.207222))
    const dep = city.parent
    const region = dep.parent
    const countryMessages = context.messages.country
    const franceMessages = countryMessages.fr
    const idfMessages = franceMessages.region[region.id]
    const hautsDeSeineMessages = idfMessages.department[dep.id]
    const cityMessages = hautsDeSeineMessages.city[city.id]
    const namedPlace: NamedPlace = {
      place: city.places[0],
      name: cityMessages.toTitle(context, city)
    }
    const source1: Source = {
      events: [], previousSourceRefs: [],
      url: "https://somesite.com/case1",
      title: "Case 1",
      authors: ["Some Author"],
      publication: {
        publisher: "Some site",
        time: TimeContext.fromDate(new Date(2001, 12, 13))
      }
    }
    const sources = [source1]
    const c: RR0CaseSummary = {
      events: [], type: "sighting",
      time: context.time,
      place: namedPlace,
      description: "some sighting", sources
    }
    const outDoc = context.file.document
    const elem = outDoc.createElement("li")
    await renderer.render(context, c, elem)
    expect(elem.innerHTML).toBe(
      `<span class="time-resolved">en <time datetime="1970-03">mars 1970</time></span> À <span class="place">Nanterre (Hauts-de-Seine, France)</span>, some sighting <span class="source">Some Author: <span><a href="https://somesite.com/case1">Case 1</a>, <i>Some site</i>, 1970-03</span></span>`)
  })
})
