import { beforeEach, describe, test } from "vitest"
import { GeipanCaseSummary } from "./GeipanCaseSummary.js"
import { geipanTestCaseSummaries } from "./GeipanTestCases.js"
import { GeipanRR0Mapping } from "./GeipanRR0Mapping.js"
import { DatasourceTestCase } from "../../../../../../time/datasource/DatasourceTestCase.js"
import { ChronologyReplacerActions } from "../../../../../../time/datasource/ChronologyReplacerActions.js"
import { RR0CaseMapping } from "../../../../../../time/datasource/rr0/RR0CaseMapping.js"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { cmsTestUtil } from "../../../../../../test/CMSTestUtil.js"
import { Level2Date as EdtfDate } from "@rr0/time"

describe("GeipanCaseSource", () => {

  const actions: ChronologyReplacerActions = {read: ["backup", "fetch"], write: ["backup", "pages"]}
  const geipanRR0Mapping = new GeipanRR0Mapping(actions).init(cmsTestUtil)

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
    context = cmsTestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1977)
    context.time.setMonth(3)
  })

  test("fetch", {skip: true}, async () => {
    await testCase.testFetch(context)
  })

  // Skipped like every other datasource's render test — baseovnifrance, urecat, rr0, nuforc, fufora,
  // sceau and ufo-search all are. This one goes through the same datasource.fetch() as the "fetch"
  // above it, so it reaches out to the CNES over the network, and a publish gate that depends on
  // somebody else's server being up is not a gate. It was the only one still switched on, which
  // read as an oversight rather than a decision: under testscript it simply ran for as long as it
  // took, so nobody had to notice.
  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
