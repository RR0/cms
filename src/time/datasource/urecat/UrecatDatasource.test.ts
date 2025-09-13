import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { cmsTestUtil } from "../../../test/index.js"
import { HtmlRR0Context } from "../../../RR0Context.js"
import { UrecatCase } from "./UrecatCase.js"
import { urecatTestCases } from "./UrecatTestCases.js"
import { DatasourceTestCase } from "../DatasourceTestCase.js"
import { UrecatHttpDatasource } from "./UrecatHttpDatasource.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { RR0CaseMapping } from "../rr0/RR0CaseMapping.js"
import { UrecatRR0Mapping } from "./UrecatRR0Mapping.js"

describe("UrecatCaseSource", () => {

  const urecatRR0Mapping = new UrecatRR0Mapping({read: ["fetch"], write: ["backup"]})
  urecatRR0Mapping.init(cmsTestUtil)

  const testCase = new class extends DatasourceTestCase<UrecatCase> {
    constructor(mapping: RR0CaseMapping<UrecatCase>, sourceCases: UrecatCase[]) {
      super(mapping, sourceCases)
    }

    protected getTime(c: UrecatCase): EdtfDate {
      return c.basicInfo.base.sightingDate
    }

    protected sortComparator(c1: UrecatCase, c2: UrecatCase): number {
      return c1.url < c2.url ? -1 : c1.url > c2.url ? 1 : 0
    }
  }(urecatRR0Mapping, urecatTestCases)

  let context: HtmlRR0Context

  beforeEach(() => {
    context = cmsTestUtil.time.newHtmlContext("1/9/7/7/03/index.html")
  })

  test("witnesses", () => {
    const datasource = testCase.mapping.datasource as UrecatHttpDatasource
    expect(datasource.getWitnesses("")).toEqual([{name: ""}])
    expect(datasource.getWitnesses("Scott C. Waring")).toEqual([{name: "Scott C. Waring"}])
    expect(datasource.getWitnesses("Un couple anonyme")).toEqual([{name: "Un couple anonyme"}])
    expect(datasource.getWitnesses("Quelqu'un")).toEqual([{name: "Quelqu'un"}])
    expect(datasource.getWitnesses("Une femme")).toEqual([{name: "Une femme"}])
    expect(datasource.getWitnesses("Un homme anomyme")).toEqual([{name: "Un homme anomyme"}])
    expect(datasource.getWitnesses("Une fille ou une femme")).toEqual([{name: "Une fille ou une femme"}])
    expect(datasource.getWitnesses("Constantin Toader et d'autres")).toEqual([
      {name: "Constantin Toader"}, {name: "d'autres"}
    ])
    expect(datasource.getWitnesses("Une femme et sa fille")).toEqual([
      {name: "Une femme"}, {name: "sa fille"}
    ])
    expect(datasource.getWitnesses("Une femme, un homme, deux parents")).toEqual([
      {name: "Une femme"}, {name: "un homme"}, {name: "parent 1"}, {name: "parent 2"}
    ])
    expect(datasource.getWitnesses("Walter Lopez, Omar Ferlatti, une bergère")).toEqual([
      {name: "Walter Lopez"}, {name: "Omar Ferlatti"}, {name: "une bergère"}
    ])
    expect(datasource.getWitnesses("Judi et David Simpson")).toEqual([
      {name: "Judi Simpson"}, {name: "David Simpson"}
    ])
    expect(datasource.getWitnesses("Une femme et ses deux enfants")).toEqual([
      {name: "Une femme"}, {name: "enfant 1"}, {name: "enfant 2"}
    ])
  })

  test("fetch", async () => {
    await testCase.testFetch(context)
  })

  test("render", {skip: true}, async () => {
    await testCase.testRender(context)
  })
})
