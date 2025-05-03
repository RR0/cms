import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { fuforaTestCases } from "./FuforaTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { FuforaCaseSummary } from "./FuforaCaseSummary.js"
import { RR0CaseMapping } from "../rr0/index.js"
import { FuforaRR0Mapping } from "./FuforaRR0Mapping.js"

describe("FuforaCaseSource", () => {

  const fuforaRR0Mapping = new FuforaRR0Mapping({read: ["fetch"], write: ["backup"]}).init(rr0TestUtil)

  const testCase = new class extends DatasourceTestCase<FuforaCaseSummary> {
    constructor(mapping: RR0CaseMapping<FuforaCaseSummary>, sourceCases: FuforaCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: FuforaCaseSummary): EdtfDate {
      return c.dateTime
    }

    protected sortComparator(c1: FuforaCaseSummary, c2: FuforaCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(fuforaRR0Mapping, fuforaTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/11/index.html")
    context.time.setYear(1970)
    context.time.setMonth(11)
  })

  test("fetch", {skip: true}, async () => {
    await testCase.testFetch(context)
  })

  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
