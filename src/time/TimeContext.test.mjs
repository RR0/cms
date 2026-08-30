import { TimeContext } from "./TimeContext.mjs"
import { describe, expect, test } from "vitest"

describe("TimeContext", () => {

  const timeContext = new TimeContext()

  const SECOND = 1000

  test("duration seconds", () => {
    timeContext.updateFromStr("P10S")
    const value = timeContext.duration.value
    expect(value).toBe(10 * SECOND)
  })

  test("updateFromStr year", () => {
    timeContext.updateFromStr("1989")
    // undefined here and null at the other two below: TimeContext is not consistent about which
    // it returns, and the loose assert.equal this was written with could not tell them apart.
    expect(timeContext.from).toBeUndefined()
    expect(timeContext.getYear()).toBe(1989)
  })

  test("updateFromStr year interval", () => {
    timeContext.updateFromStr("1989/2001")
    const toYearVal = timeContext.to.year
    const toYear = toYearVal.value
    expect(toYear).toBe(2001)
    const fromYearVal = timeContext.from.year
    const fromYear = fromYearVal.value
    expect(fromYear).toBe(1989)
  })

  test("updateFromStr year from", () => {
    timeContext.updateFromStr("1989/")
    const fromYearVal = timeContext.from.year
    const fromYear = fromYearVal.value
    expect(fromYear).toBe(1989)
    expect(timeContext.to).toBeNull()
    expect(timeContext.getYear()).toBe(undefined)
  })

  test("updateFromStr year to", () => {
    timeContext.updateFromStr("/2001")
    expect(timeContext.from).toBeNull()
    const toYearVal = timeContext.to.year
    const toYear = toYearVal.value
    expect(toYear).toBe(2001)
    expect(timeContext.getYear()).toBe(undefined)
  })

  test("updateFromStr year-month", () => {
    timeContext.updateFromStr("1989-10")
    expect(timeContext.getYear()).toBe(1989)
    expect(timeContext.getMonth()).toBe(10)
  })

  test("updateFromStr year-month-day", () => {
    timeContext.updateFromStr("1989-10-25")
    expect(timeContext.getYear()).toBe(1989)
    expect(timeContext.getMonth()).toBe(10)
    expect(timeContext.getDayOfMonth()).toBe(25)
  })

  test("updateFromStr year-month-day hour:minutes", () => {
    timeContext.updateFromStr("1989-10-25 12:55")
    expect(timeContext.getYear()).toBe(1989)
    expect(timeContext.getMonth()).toBe(10)
    expect(timeContext.getDayOfMonth()).toBe(25)
    expect(timeContext.getHour()).toBe(12)
    expect(timeContext.getMinutes()).toBe(55)
  })

  test("fromDate", () => {
    const month = 12
    const date = new Date(2001, month - 1, 13)
    const timeContext = TimeContext.fromDate(date)
    expect(timeContext.getYear()).toBe(2001)
    expect(timeContext.getMonth()).toBe(month)
    expect(timeContext.getDayOfMonth()).toBe(13)
  })

  test("clone", () => {
    timeContext.updateFromStr("2006-07-14T17:56")
    expect(timeContext.getYear()).toBe(2006)
    expect(timeContext.getMonth()).toBe(7)
    expect(timeContext.getDayOfMonth()).toBe(14)
    expect(timeContext.getHour()).toBe(17)
    expect(timeContext.getMinutes()).toBe(56)
    const clone = timeContext.clone()
    expect(clone.getYear()).toBe(2006)
    expect(clone.getMonth()).toBe(7)
    expect(clone.getDayOfMonth()).toBe(14)
    expect(clone.getHour()).toBe(17)
    expect(clone.getMinutes()).toBe(56)
  })
})
