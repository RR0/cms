import { beforeEach, describe, test } from "@javarome/testscript"
import { cmsTestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { UfoSearchCase } from "./UfoSearchCase.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { ufoSearchTestCases } from "./UfoSearchTestCases.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { UfoSearchRR0Mapping } from "./UfoSearchMapping.js"

describe("UfoSearchCaseSource", () => {

  const ufoSearchRR0Mapping = new UfoSearchRR0Mapping({read: ["fetch"], write: ["backup"]}).init(cmsTestUtil)

  const testCase = new class extends DatasourceTestCase<UfoSearchCase> {
    constructor(mapping: RR0CaseMapping<UfoSearchCase>, sourceCases: UfoSearchCase[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: UfoSearchCase): EdtfDate {
      return c.time
    }

    protected sortComparator(c1: UfoSearchCase, c2: UfoSearchCase): number {
      return c1.id < c2.id ? -1 : c1.id > c2.id ? 1 : 0
    }
  }(ufoSearchRR0Mapping, ufoSearchTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = cmsTestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1977)
    context.time.setMonth(3)
  })

  test("fetch", {skip: true}, async () => {
    await testCase.testFetch(context)
  })

  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
