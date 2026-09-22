import { describe, expect, test } from "vitest"
import { LinkType } from "ssg-api"
import { cmsTestUtil } from "../test/CMSTestUtil.js"
import { TimeLinkDefaultHandler } from "./TimeLinkDefaultHandler.js"

describe("TimeLinkDefaultHandler", () => {

  const rootDir = cmsTestUtil.filePath("time")
  const files = [
    "1/9/5/4/10/index.html",
    "1/9/7/index.html",
    "1/9/7/0/index.html",
    "1/9/7/0/03/index.html",
    "1/9/7/0/11/index.html",
    "1/9/9/0/index.html"
  ].map(file => rootDir + "/" + file)
  const url = (file: string) => "/" + rootDir + "/" + file
  const timeUtil = cmsTestUtil.time
  const service = timeUtil.getService({rootDir, files})
  const handler = new TimeLinkDefaultHandler(service, timeUtil.urlBuilder, timeUtil.timeTextBuilder)
  const context = cmsTestUtil.newHtmlContext("time/1/9/7/0/11/index.html", "<html><body></body></html>")

  test("start is the chronology", () => {
    expect(handler.start(context)).toEqual({type: LinkType.start, text: "Chronologie", url: "/time/"})
  })

  test("contents is the period containing the page, not the previous page", () => {
    const contents = handler.contents(context)!
    expect(contents.type).toBe(LinkType.contents)
    expect(contents.url).toBe(url("1/9/7/0/index.html"))
    expect(contents.text).toBe("1970")
  })

  test("prev and next follow the files order", () => {
    expect(handler.prev(context)!.url).toBe(url("1/9/7/0/03/index.html"))
    expect(handler.next(context)!.url).toBe(url("1/9/9/0/index.html"))
  })

  test("a decade is titled by its page, not as the year its path starts with", () => {
    const yearContext = cmsTestUtil.newHtmlContext("time/1/9/7/0/index.html", "<html><body></body></html>")
    const contents = handler.contents(yearContext)!
    expect(contents.url).toBe(url("1/9/7/index.html"))
    expect(contents.text).toBe("1970s")
  })

  test("a page below a period without page is listed by the nearest one", () => {
    const dayContext = cmsTestUtil.newHtmlContext("time/1/9/5/4/10/01/index.html", "<html><body></body></html>")
    expect(handler.contents(dayContext)!.url).toBe(url("1/9/5/4/10/index.html"))
  })
})
