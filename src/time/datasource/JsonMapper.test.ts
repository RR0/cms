import { beforeEach, describe, expect, test } from "@javarome/testscript"
import fs from "fs"
import { UfoSearchCaseRR0Mapper, ufoSearchCaseRR0Mapper, ufoSearchFileDatasource } from "./ufo-search"
import { rr0TestUtil } from "../../test"
import { ufoSearchTestCases } from "./ufo-search/UfoSearchTestCases"
import { RR0SsgContext } from "../../RR0SsgContext"

describe("JsonMapper", () => {

  const dataDate = new Date("2024-08-12 00:00:00 GMT+1")

  let context: RR0SsgContext
  let mapper: UfoSearchCaseRR0Mapper

  beforeEach(() => {
    context = rr0TestUtil.newContext("time/1/9/7/0/03/index.html")
    mapper = ufoSearchCaseRR0Mapper
  })

  test("read", () => {
    const data = fs.readFileSync(ufoSearchFileDatasource.fileName, {encoding: "utf-8"})
    const cases = ufoSearchFileDatasource.fileMapper.parse(context, data)
    expect(cases.length).toEqual(54751)
    const expected1 = ufoSearchTestCases[0]
    const case1 = cases.find(c => c.key_vals.url === expected1.key_vals.url)
    expect(case1).toEqual(expected1)
    const expected2 = ufoSearchTestCases[1]
    const case2 = cases.find(c => c.key_vals.url === expected2.key_vals.url)
    expect(case2).toEqual(expected2)
  })
})