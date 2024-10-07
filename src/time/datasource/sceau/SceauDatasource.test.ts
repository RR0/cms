import { beforeEach, describe, test } from "@javarome/testscript"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { SceauCaseSummary } from "./SceauCaseSummary.js"
import { TimeContext } from "../../TimeContext.js"
import { Source } from "../../../source/index.js"
import { HtmlTag } from "../../../util/index.js"
import { SceauCaseMapping } from "./SceauCaseMapping.js"
import { SceauDatasource } from "./SceauDatasource.js"
import { ChronologyReplacerActions } from "../ChronologyReplacerActions.js"
import { TimeTextBuilder } from "../../TimeTextBuilder.js"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0SsgContext } from "../../../RR0SsgContext.js"
import { sceauDatasource, sceauRR0Mapper } from "./SceauRR0Mapping.js"
import { sceauTestCases } from "./SceauTestCases.js"

export class SceauTestDatasource extends SceauDatasource {

  timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  constructor() { // Makes inherited constructor public
    super()
  }

  protected async readCases(_context: HtmlRR0SsgContext): Promise<SceauCaseSummary[]> {
    return sceauTestCases
  }
}

export class SceauTestMapping implements SceauCaseMapping {
  readonly datasource = sceauDatasource // new SceauTestDatasource()
  readonly mapper = sceauRR0Mapper

  constructor(readonly actions: ChronologyReplacerActions) {
  }
}


describe("SCEAUCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<SceauCaseSummary> {
    constructor(mapping: SceauCaseMapping, sourceCases: SceauCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: SceauCaseSummary): TimeContext {
      return TimeContext.fromString(c.dateCas)
    }

    protected sortComparator(c1: SceauCaseSummary, c2: SceauCaseSummary): number {
      const c1Time = this.getTime(c1)
      const c2time = this.getTime(c2)
      return !c1Time || c2time && c1Time.isBefore(c2time) ? -1 : !c2time || c1Time.isAfter(c2time) ? 1 : 0
    }

    /**
     * Specialization of sources for SCEAU cases
     */
    protected expectedSourceStr(context: HtmlRR0SsgContext, expectedSources: Source[], _nativeCase: SceauCaseSummary) {
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
            sourceContext.time = source.publication.time
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

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
