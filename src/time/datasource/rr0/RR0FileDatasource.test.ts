import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../../test/index.js"
import { rr0TestCases } from "./RR0TestCases.js"
import { RR0CaseSummaryMapper } from "./RR0CaseSummaryMapper"
import { RR0FileDatasource } from "./RR0FileDatasource"


describe("RR0FileDatasource", () => {

  test("save", async () => {
    const csvMapper = new RR0CaseSummaryMapper(new URL("https://rr0.org"), "time",
      ["Beau, Jérôme"])
    const datasource = new RR0FileDatasource(csvMapper)
    const context = rr0TestUtil.newHtmlContext("time/1/9/7/0/03/index.html")
    const fileName = datasource.save(context, rr0TestCases, new Date("2025-01-01"))
    expect(fileName).toBe("test/time/1/9/7/0/03/BeauJerome_RR0.csv")
  })
})
