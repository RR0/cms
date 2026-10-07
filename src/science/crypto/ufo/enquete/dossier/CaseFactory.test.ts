import { describe, expect, test } from "vitest"
import { FileContents, FileContentsLang } from "@javarome/fileutil"
import { EventTime, RR0EventFactory } from "@rr0/data"
import { Level2Date as EdtfDate, Level2Interval as EdtfInterval } from "@rr0/time"
import { CaseFactory } from "./CaseFactory.js"

describe("CaseFactory", () => {

  function read(time: string) {
    const lang = new FileContentsLang()
    lang.lang = ""
    lang.variants = []
    const file = new FileContents("test/science/crypto/ufo/enquete/dossier/SomeCase/case.json", "utf-8", `{
  "type": "case",
  "title": "Some case",
  "time": "${time}",
  "place": "Washington",
  "events": []
}
`, new Date("2025-02-22T22:22:07.720Z"), lang)
    return new CaseFactory(new RR0EventFactory()).createFromFile(file)
  }

  test("a date", () => {
    const aCase = read("1952-07-19")
    expect(aCase.time).toBeInstanceOf(EdtfDate)
    expect(aCase.time.toString()).toBe("1952-07-19")
  })

  test("an approximate date", () => {
    expect(read("~1952").time.toString()).toBe("~1952")
  })

  test("between x and y", () => {
    const aCase = read("1952-07-19/1952-07-26")
    expect(aCase.time).toBeInstanceOf(EdtfInterval)
    expect(aCase.time.toString()).toBe("1952-07-19/1952-07-26")
    expect(EventTime.start(aCase.time).day.value).toBe(19)
  })

  test("years", () => {
    expect(read("1966/1993").time.toString()).toBe("1966/1993")
  })
})
