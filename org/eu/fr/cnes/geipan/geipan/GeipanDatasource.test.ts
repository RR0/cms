import { beforeEach, describe, test } from "@javarome/testscript"
import { GeipanCaseSummary } from "./GeipanCaseSummary"
import { geipanTestCaseSummaries } from "./GeipanTestCases"
import { geipanRR0Mapping } from "./GeipanRR0Mapping"
import { DatasourceTestCase } from "../../../../../../time/datasource/DatasourceTestCase"
import { RR0CaseMapping, TimeContext } from "../../../../../../time"
import { HtmlRR0SsgContext } from "../../../../../../RR0SsgContext"
import { rr0TestUtil } from "../../../../../../test"

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

  let context: HtmlRR0SsgContext

  beforeEach(() => {
    context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
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
