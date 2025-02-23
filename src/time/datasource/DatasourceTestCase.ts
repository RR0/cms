import { expect } from "@javarome/testscript"
import { CaseSummaryRenderer } from "../CaseSummaryRenderer.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { TimeTextBuilder } from "../text/TimeTextBuilder.js"
import { SourceFactory, SourceRenderer } from "../../source/index.js"
import { RR0CaseMapping } from "./rr0/index.js"
import { NoteFileCounter, NoteRenderer } from "../../note/index.js"
import { HttpSource } from "./HttpSource.js"
import { TimeElementFactory } from "../html/TimeElementFactory.js"
import { TimeRenderer } from "../html/TimeRenderer.js"
import { rr0TestUtil } from "../../test"
import { AllDataService } from "@rr0/data"
import { Source } from "@rr0/data/dist/source"
import { PlaceRenderer } from "../../place/PlaceRenderer"

export abstract class DatasourceTestCase<S> {

  timeTextBuilder = new TimeTextBuilder(this.intlOptions)
  placeRenderer = new PlaceRenderer()

  protected constructor(
    readonly mapping: RR0CaseMapping<S>,
    readonly sourceCases: S[],
    protected readonly intlOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    }
  ) {
  }

  checkCaseHTML(context: HtmlRR0Context, nativeCase: S, item: HTMLLIElement, dataDate: Date) {
    const expected = this.mapping.mapper.map(context, nativeCase, dataDate)
    const time = this.getTime(nativeCase)
    const caseContext = context.clone()
    caseContext.time.date = time
    const timeStr = this.timeTextBuilder.build(caseContext)
    const placeStr = expected.place ? this.placeRenderer.render(context, expected.place) : ""
    const expectedSources = expected.sources
    const sourceStr = expectedSources?.length > 0 ? this.expectedSourceStr(context, expectedSources, nativeCase) : ""
    expect(item.innerHTML).toBe(
      `<span class="time-resolved">${time.day ? "le" : "en"} <time datetime="${time.toString()}">${timeStr}</time></span>${placeStr}, ${expected.description}${sourceStr}.`)
  }

  async testRender(context: HtmlRR0Context) {
    const sourceCases = await this.mapping.datasource.fetch(context)
    const dataDate = new Date("2024-08-12 00:00:00 GMT+1")
    const cases = sourceCases.map(sourceCase => this.mapping.mapper.map(context, sourceCase, dataDate))
    const dataService = new AllDataService([])
    const baseUrl = "https://rr0.org"
    const http = new HttpSource()
    const timeService = await rr0TestUtil.time.getService()
    const sourceFactory = new SourceFactory(dataService, http, baseUrl, this.intlOptions, timeService)
    const timeElementFactory = new TimeElementFactory(
      new TimeRenderer(rr0TestUtil.time.urlBuilder, this.timeTextBuilder))
    const eventRenderer = new CaseSummaryRenderer(new NoteRenderer(new NoteFileCounter()), sourceFactory,
      new SourceRenderer(this.timeTextBuilder), timeElementFactory)
    const items = []
    for (const c of cases) {
      const outDoc = context.file.document
      const item = outDoc.createElement("li")
      await eventRenderer.render(context, c, item)
      items.push(item)
    }
    expect(items.length).toBe(sourceCases.length)
    for (let i = 0; i < sourceCases.length; i++) {
      this.checkCaseHTML(context, sourceCases[i], items[i], dataDate)
    }
  }

  async testFetch(context: HtmlRR0Context) {
    const fetched = await this.mapping.datasource.fetch(context)
    const fetchSlice = fetched.slice(0, this.sourceCases.length)
    const sortedFetch = fetchSlice.sort(this.sortComparator)
    const sortedTestCases = this.sourceCases.sort(this.sortComparator)
    expect(sortedFetch).toEqual(sortedTestCases)
  }

  protected abstract sortComparator(c1: S, c2: S): number

  protected abstract getTime(c: S): EdtfDate

  protected expectedSourceStr(context: HtmlRR0Context, expectedSources: Source[], nativeCase: S) {
    const datasource = this.mapping.datasource
    const source = expectedSources[0]
    const sourceContext = context.clone()
    sourceContext.time.date = source.publication.time
    const publicationStr = source.publication ? `, ${this.timeTextBuilder.build(sourceContext)}` : ""
    const indexStr = source.index ? `, ${source.index}` : ""
    const authorStr = datasource.authors.map(authorStr => `<span class="people">${authorStr}</span>`).join(" &amp; ")
    const title = `cas n° ${nativeCase["id"]}`
    return ` <span class="source">${authorStr}: <a href="${nativeCase["url"].replaceAll(
      "&",
      "&amp;")}">${title}</a>, <i>${datasource.copyright}</i>${publicationStr}${indexStr}</span>`
  }
}
