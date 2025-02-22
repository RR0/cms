import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { TimeContextFilter } from "./TimeContextFilter"
import { HtmlRR0Context } from "../../RR0Context"
import { rr0TestUtil } from "../../test"

describe("TimeContextFilter", () => {

  let context: HtmlRR0Context

  beforeEach(() => {
    context = rr0TestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("test", async () => {
    const filter = new TimeContextFilter(context)
    expect(filter.filter({})).toBe(true)
  })
})
