import { describe, expect, test } from "@javarome/testscript"
import { TimeContext } from "./TimeContext.js"

describe("TimeContext", () => {

  const timeContext = new TimeContext()

  const SECOND = 1000

  test("duration seconds", () => {
    timeContext.updateFromStr("P10S")
    expect(timeContext.duration.value).toBe(10 * SECOND)
  })

  test("updateFromStr year", () => {
    timeContext.updateFromStr("1989")
    expect(timeContext.from).toBeUndefined()
    expect(timeContext.getYear()).toBe(1989)
  })

  test("updateFromStr year interval", () => {
    timeContext.updateFromStr("1989/2001")
    expect(timeContext.to.year.value).toBe(2001)
    expect(timeContext.from.year.value).toBe(1989)
  })

  test("updateFromStr year from", () => {
    timeContext.updateFromStr("1989/")
    expect(timeContext.from.year.value).toBe(1989)
    expect(timeContext.to).toBeUndefined()
    expect(timeContext.getYear()).toBeUndefined()
  })

  test("updateFromStr year to", () => {
    timeContext.updateFromStr("/2001")
    expect(timeContext.from).toBeUndefined()
    expect(timeContext.to.year.value).toBe(2001)
    expect(timeContext.getYear()).toBeUndefined()
  })

  test("updateFromStr year-month", () => {
    timeContext.updateFromStr("1989-10")
    expect(timeContext.date.year.value).toBe(1989)
    expect(timeContext.date.month.value).toBe(10)
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
})
