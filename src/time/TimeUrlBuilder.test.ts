import { TimeUrlBuilder } from "./TimeUrlBuilder.js"
import { TimeContext } from "@rr0/time"
import { RR0ContextImpl } from "../RR0Context.js"
import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "../test/index.js"
import path from "path"

describe("TimeUrlBuilder", () => {

  const config = rr0TestUtil.config
  const rootDir = rr0TestUtil.time.fullRoot
  const timeUrlBuilder = new TimeUrlBuilder({rootDir})

  test("builds year", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2008)
      const url = timeUrlBuilder.fromContext(context.time)
      expect(url).toEqual(path.join(rootDir, "2/0/0/8"))
    }
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setYear(2020)  // Resets month and day
      const url = timeUrlBuilder.fromContext(context.time)
      expect(url).toEqual(path.join(rootDir, "2/0/2/0"))
    }
  })

  test("builds month", () => {
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2001)
      context.time.setMonth(9)
      const url = timeUrlBuilder.fromContext(context.time)
      expect(url).toBe(path.join(rootDir, "2/0/0/1/09"))
    }
    {
      const context = new RR0ContextImpl("fr", new TimeContext(), config)
      context.time.setYear(2012)
      context.time.setMonth(8)
      context.time.setDayOfMonth(12)
      context.time.setMonth(2)
      const url = timeUrlBuilder.fromContext(context.time)
      expect(url).toEqual(path.join(rootDir, "2/0/1/2/02"))
    }
  })
})
