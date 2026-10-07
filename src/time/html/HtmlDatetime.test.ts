import { describe, expect, test } from "vitest"
import { Level2Date, Level2Duration } from "@rr0/time"
import { HtmlDatetime } from "./HtmlDatetime.js"
import { cmsTestUtil } from "../../test/CMSTestUtil.js"

describe("HtmlDatetime", () => {

  describe("date", () => {
    test.each([
      ["2004", "2004"],
      ["0033", "0033"],
      ["2004-06", "2004-06"],
      ["2004-06-11", "2004-06-11"],
      ["2004-06-11T09:12", "2004-06-11T09:12"],
      ["2004-06-11T09:12:33", "2004-06-11T09:12:33"],
      ["2004-06-11 09:12", "2004-06-11T09:12"],
      ["2004-06-11T09:12:33Z", "2004-06-11T09:12:33Z"],
      ["2004-06-11T09:12:33+01", "2004-06-11T09:12:33+01:00"],
      ["2004-06-11T09:12-05", "2004-06-11T09:12-05:00"],
      ["1947-06-24 21:45PST", "1947-06-24T21:45-08:00"]
    ])("%s is %s", (edtf, expected) => {
      expect(HtmlDatetime.of(Level2Date.fromString(edtf))).toBe(expected)
    })

    test("qualification is not part of the HTML value", () => {
      expect(HtmlDatetime.of(Level2Date.fromString("2004-~06"))).toBe("2004-06")
      expect(HtmlDatetime.of(Level2Date.fromString("2004-06~"))).toBe("2004-06")
      expect(HtmlDatetime.of(Level2Date.fromString("?2004-06-11"))).toBe("2004-06-11")
    })

    test("an hour without minutes has no HTML equivalent, the date remains", () => {
      expect(HtmlDatetime.of(new Level2Date({year: 2004, month: 6, day: 11, hour: 9}))).toBe("2004-06-11")
    })

    test("a season is no month", () => {
      expect(HtmlDatetime.of(Level2Date.fromString("2004-21"))).toBe("2004")
    })

    test("a year before 1 has no HTML equivalent", () => {
      expect(HtmlDatetime.of(Level2Date.fromString("-0033"))).toBeUndefined()
    })
  })

  describe("duration", () => {
    test.each([
      ["P2D", "P2D"],
      ["P20H", "PT20H"],
      ["P90S", "PT1M30S"],
      ["P2D10H23M45S", "P2DT10H23M45S"],
      ["PT30M", "PT30M"]
    ])("%s is %s", (edtf, expected) => {
      expect(HtmlDatetime.of(Level2Duration.fromString(edtf))).toBe(expected)
    })

    test("months are written MM in the former notation, and have no HTML equivalent", () => {
      expect(HtmlDatetime.of(Level2Duration.fromString("P2MM"))).toBeUndefined()
    })

    test("years have no HTML equivalent", () => {
      expect(HtmlDatetime.of(Level2Duration.fromString("P1Y"))).toBeUndefined()
    })

    test("qualification is not part of the HTML value", () => {
      expect(HtmlDatetime.of(Level2Duration.fromString("~P20H"))).toBe("PT20H")
    })
  })

  describe("element", () => {
    const newTimeEl = () => cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "").file.document.createElement("time")

    test("data-edtf is not set when HTML reads the same value", () => {
      const timeEl = newTimeEl()
      HtmlDatetime.apply(timeEl, Level2Date.fromString("2004-06-11"))
      expect(timeEl.getAttribute("datetime")).toBe("2004-06-11")
      expect(timeEl.hasAttribute("data-edtf")).toBe(false)
    })

    test("data-edtf holds the EDTF when HTML reads it differently", () => {
      const timeEl = newTimeEl()
      const date = Level2Date.fromString("2004-06-11T09:12+01")
      HtmlDatetime.apply(timeEl, date)
      expect(timeEl.getAttribute("datetime")).toBe("2004-06-11T09:12+01:00")
      expect(timeEl.getAttribute("data-edtf")).toBe(date.toString())
    })

    test("data-edtf holds the EDTF when HTML has no equivalent, and then datetime is not set", () => {
      const timeEl = newTimeEl()
      const duration = Level2Duration.fromString("P2MM")
      HtmlDatetime.apply(timeEl, duration)
      expect(timeEl.hasAttribute("datetime")).toBe(false)
      expect(timeEl.getAttribute("data-edtf")).toBe(duration.toString())
    })
  })
})
