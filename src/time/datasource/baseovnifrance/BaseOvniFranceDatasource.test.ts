import { beforeEach, describe, test } from "@javarome/testscript"
import { cmsTestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { BaseOvniFranceRR0Mapping, baseOvniFranceSortComparator } from "./BaseOvniFranceRR0Mapping.js"
import { RR0CaseMapping } from "../rr0/index.js"

describe("BaseOvniFranceCaseSource", () => {

  const baseOvniFranceRR0Mapping = new BaseOvniFranceRR0Mapping({read: ["fetch"], write: ["backup"]}).init(cmsTestUtil)

  const testCase = new class extends DatasourceTestCase<BaseOvniFranceCaseSummary> {
    constructor(mapping: RR0CaseMapping<BaseOvniFranceCaseSummary>, sourceCases: BaseOvniFranceCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: BaseOvniFranceCaseSummary): EdtfDate {
      return c.time
    }

    protected sortComparator(c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary): number {
      return baseOvniFranceSortComparator(c1, c2)
    }
  }(baseOvniFranceRR0Mapping, baseOvniFranceTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = cmsTestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
