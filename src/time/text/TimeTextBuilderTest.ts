import { TimeContext } from "@rr0/time"
import { RR0ContextImpl } from "../../RR0Context.js"
import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../../test"
import { TimeTextBuilder } from "./TimeTextBuilder.js"

describe("timeTextBuilder", () => {

  const config = rr0TestUtil.config
  const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)

  test("prints year", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      expect(timeTextBuilder.build(context, true)).toBe("2003")
    }
  })

  test("prints month", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(timeTextBuilder.build(context, true)).toBe("septembre 2003")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(timeTextBuilder.build(context, true)).toBe("September 2003")
    }
  })

  test("prints day", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context, true)).toBe("mardi 23 septembre 2003")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context, true)).toBe("Tuesday, September 23, 2003")
    }
  })

  test("prints hour", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      context.time.setHour(16)
      expect(timeTextBuilder.build(context, true)).toBe("mardi 23 septembre 2003 à 16 h")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context, true)).toBe("Tuesday, September 23, 2003")
    }
  })
})
