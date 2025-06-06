import { beforeEach, describe, test } from "@javarome/testscript"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { HtmlTag } from "../../../util/index.js"
import { SceauCaseMapping } from "./SceauCaseMapping.js"
import { SceauDatasource } from "./SceauDatasource.js"
import { TimeTextBuilder } from "../../text/TimeTextBuilder.js"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { sceauDatasource } from "./SceauRR0Mapping.js"
import { sceauTestCases } from "./SceauTestCases.js"
import { RR0SourceType, Source } from "@rr0/data"
import { SceauCaseSummaryRR0Mapper } from "./SceauCaseSummaryRR0Mapper.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"

import { CMSContext } from "../../../CMSContext.js"

export class SceauTestDatasource extends SceauDatasource {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  constructor() { // Makes inherited constructor public
    super()
  }

  protected async readCases(_context: HtmlRR0Context): Promise<SceauCaseSummary[]> {
    return sceauTestCases
  }
}

export class SceauTestMapping implements SceauCaseMapping {
  datasource = sceauDatasource // new SceauTestDatasource()
  mapper: SceauCaseSummaryRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions = {read: ["fetch"], write: ["backup"]}) {
  }

  init(build: CMSContext): this {
    this.mapper = new SceauCaseSummaryRR0Mapper(rr0TestUtil.cityService, sceauDatasource.baseUrl,
      sceauDatasource.copyright, sceauDatasource.authors)
    return this
  }
}

describe("SCEAUCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<SceauCaseSummary> {
    constructor(mapping: SceauCaseMapping, sourceCases: SceauCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: SceauCaseSummary): EdtfDate {
      return EdtfDate.fromString(c.dateCas)
    }

    protected sortComparator(c1: SceauCaseSummary, c2: SceauCaseSummary): number {
      const c1Time = this.getTime(c1)
      const c2time = this.getTime(c2)
      return !c1Time || c2time && c1Time.isBefore(c2time) ? -1 : !c2time || c1Time.isAfter(c2time) ? 1 : 0
    }

    /**
     * Specialization of sources for SCEAU cases
     */
    protected expectedSourceStr(context: HtmlRR0Context, expectedSources: Source<RR0SourceType>[],
                                _nativeCase: SceauCaseSummary) {
      return expectedSources.map(source => {
        const sourceItems: string[] = []
        let authorStr = source.authors.map(author => `<span class="people">${author}</span>`).join(" &amp; ")
        if (authorStr) {
          authorStr += "&nbsp;: "
        }
        if (source.title) {
          sourceItems.push(source.title)
        }
        const publication = source.publication
        if (publication) {
          if (publication.publisher) {
            sourceItems.push(`<i>${publication.publisher}</i>`)
          }
          if (publication.time) {
            const sourceContext = context.clone()
            sourceContext.time.date = source.publication.time
            const timeStr = this.timeTextBuilder.build(sourceContext)
            sourceItems.push(timeStr)
          }
        }
        const index = source.index
        if (index) {
          sourceItems.push(index)
        }
        return " " + HtmlTag.toString("span", authorStr + sourceItems.join(", "), {class: "source"})
      }).join("")
    }
  }(new SceauTestMapping({read: ["fetch"], write: []}), sceauTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch", {skip: true}, async () => {
    await testCase.testFetch(context)
  })

  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
