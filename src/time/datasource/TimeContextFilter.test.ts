import { beforeEach, describe, expect, test } from "@javarome/testscript"
import { TimeContextFilter } from "./TimeContextFilter.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { cmsTestUtil } from "../../test/index.js"

describe("TimeContextFilter", () => {

  let context: HtmlRR0Context

  beforeEach(() => {
    context = cmsTestUtil.time.newHtmlContext("1/9/7/0/03/index.html")
    context.time.setYear(1970)
    context.time.setMonth(3)
  })

  test("test", async () => {
    const filter = new TimeContextFilter(context)
    expect(filter.filter({})).toBe(true)
  })
})
