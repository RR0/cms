import { beforeEach, describe, expect, test } from "@javarome/testscript"
import fs from "fs"
import { rr0TestUtil } from "../../test/index.js"
import { ufoSearchTestCases } from "./ufo-search/UfoSearchTestCases.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import path from "path"
import { UfoSearchRR0Mapping } from "./ufo-search"

describe("JsonMapper", () => {

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html", undefined, "en")
  })

  test("read", () => {
    const ufoSearchMapping = new UfoSearchRR0Mapping({read: ["fetch"], write: ["backup"]}).init(rr0TestUtil)
    const ufoSearchFileDatasource = ufoSearchMapping.backupDatasource
    const data = fs.readFileSync(path.join("src", ufoSearchFileDatasource.fileName), {encoding: "utf-8"})
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
