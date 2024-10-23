import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { NuforcCaseSummary } from "./NuforcCaseSummary.js"
import { nuforcRR0Mapping } from "./NuforcRR0Mapping.js"
import { nuforcTestCases } from "./NuforcTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { TimeContext } from "@rr0/time"
import { RR0CaseMapping } from "../rr0/index.js"

describe("NuforcCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<NuforcCaseSummary> {
    constructor(mapping: RR0CaseMapping<NuforcCaseSummary>, sourceCases: NuforcCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: NuforcCaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: NuforcCaseSummary, c2: NuforcCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(nuforcRR0Mapping, nuforcTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
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
