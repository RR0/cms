import { RR0ContextImpl } from "../../RR0Context.js"
import { describe, expect, test } from "vitest"
import { cmsTestUtil } from "../../test/CMSTestUtil.js"
import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { TimeContext } from "../TimeContext.mjs"

describe("timeTextBuilder", () => {

  const config = cmsTestUtil.config
  const timeTextBuilder = new TimeTextBuilder(cmsTestUtil.intlOptions)

  test("prints year", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      expect(timeTextBuilder.build(context)).toBe("2003")
    }
  })

  test("prints month", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(timeTextBuilder.build(context)).toBe("septembre 2003")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      expect(timeTextBuilder.build(context)).toBe("September 2003")
    }
  })

  test("prints day", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context)).toBe("mardi 23 septembre 2003")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context)).toBe("Tuesday, September 23, 2003")
    }
  })

  test("prints midnight hour (0) instead of dropping it", () => {
    const context = new RR0ContextImpl("fr", new TimeContext(), config)
    context.time.setYear(1991)
    context.time.setMonth(9)
    context.time.setDayOfMonth(18)
    context.time.setHour(0)
    context.time.setMinutes(38)
    expect(timeTextBuilder.build(context)).toBe("mercredi 18 septembre 1991 à 00:38")
  })

  test("prints hour", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      context.time.setHour(16)
      expect(timeTextBuilder.build(context)).toBe("mardi 23 septembre 2003 à 16 h")
    }
    {
      const context = new RR0ContextImpl("en", new TimeContext(), config)
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      expect(timeTextBuilder.build(context)).toBe("Tuesday, September 23, 2003")
    }
  })
})
