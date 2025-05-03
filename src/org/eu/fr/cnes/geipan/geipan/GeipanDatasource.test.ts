import { beforeEach, describe, test } from "@javarome/testscript"
import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { geipanTestCaseSummaries } from "./GeipanTestCases.js"
import { GeipanRR0Mapping } from "./GeipanRR0Mapping.js"
import { DatasourceTestCase } from "../../../../../../time/datasource/DatasourceTestCase.js"
import { ChronologyReplacerActions, RR0CaseMapping } from "../../../../../../time/index.js"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { rr0TestUtil } from "../../../../../../test/index.js"
import { Level2Date as EdtfDate } from "@rr0/time"

describe("GeipanCaseSource", () => {

  const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
  const geipanRR0Mapping = new GeipanRR0Mapping(actions).init(rr0TestUtil)

  const testCase = new class extends DatasourceTestCase<GeipanCaseSummary> {
    constructor(mapping: RR0CaseMapping<GeipanCaseSummary>, sourceCases: GeipanCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: GeipanCaseSummary): EdtfDate {
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

  test("fetch", {skip: true}, async () => {
    await testCase.testFetch(context)
  })

  test("render", async () => {
    await testCase.testRender(context)
  })
})
