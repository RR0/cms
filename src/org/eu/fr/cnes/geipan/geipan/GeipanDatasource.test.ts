import { beforeEach, describe, test } from "@javarome/testscript"
import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { geipanTestCaseSummaries } from "./GeipanTestCases.js"
import { geipanRR0Mapping } from "./GeipanRR0Mapping.js"
import { DatasourceTestCase } from "../../../../../../time/datasource/DatasourceTestCase.js"
import { RR0CaseMapping, TimeContext } from "../../../../../../time/index.js"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { rr0TestUtil } from "../../../../../../test/index.js"

describe("GeipanCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<GeipanCaseSummary> {
    constructor(mapping: RR0CaseMapping<GeipanCaseSummary>, sourceCases: GeipanCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: GeipanCaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: GeipanCaseSummary, c2: GeipanCaseSummary): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(geipanRR0Mapping, geipanTestCaseSummaries)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1977)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
