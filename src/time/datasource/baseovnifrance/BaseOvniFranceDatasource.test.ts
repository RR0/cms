import { beforeEach, describe, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { baseOvniFranceTestCases } from "./BaseOvniFranceTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { TimeContext } from "@rr0/time"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary.js"
import { baseOvniFranceRR0Mapping, baseOvniFranceSortComparator } from "./BaseOvniFranceRR0Mapping.js"
import { RR0CaseMapping } from "../rr0/index.js"

describe("BaseOvniFranceCaseSource", () => {

  const testCase = new class extends DatasourceTestCase<BaseOvniFranceCaseSummary> {
    constructor(mapping: RR0CaseMapping<BaseOvniFranceCaseSummary>, sourceCases: BaseOvniFranceCaseSummary[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: BaseOvniFranceCaseSummary): TimeContext {
      return c.time
    }

    protected sortComparator(c1: BaseOvniFranceCaseSummary, c2: BaseOvniFranceCaseSummary): number {
      return baseOvniFranceSortComparator(c1, c2)
    }
  }(baseOvniFranceRR0Mapping, baseOvniFranceTestCases)

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
