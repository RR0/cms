import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder.js"
import { rr0TestUtil } from "../../test"
import { describe, expect, test } from "@javarome/testscript"
import { TimeTextBuilder } from "./TimeTextBuilder.js"

describe("RelativeTimeTextBuilder", () => {

  const timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  const relativeTimeTextBuilder = new RelativeTimeTextBuilder(timeTextBuilder)

  test("next year", () => {
    {
      const previousContext = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "")
      previousContext.time.setYear(2003)
      const context = previousContext.clone()
      context.time.setYear(2004)
      const s1 = relativeTimeTextBuilder.build(previousContext, context)
      expect(s1).toBe("l'année suivante")
      context.time.setMonth(6)
      const s2 = relativeTimeTextBuilder.build(previousContext, context)
      expect(s2).toBe("juin 2004")
    }
  })

  test("change year", () => {
    const previousContext = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "")
    previousContext.time.setYear(1947)
    const context = previousContext.clone()
    context.time.setYear(1990)
    context.time.setMonth(8)
    context.time.setDayOfMonth(4)
    const s = relativeTimeTextBuilder.build(previousContext, context)
    expect(s).toBe("samedi 4 août 1990")
  })

  test("next month", () => {
    {
      const context1 = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "")
      context1.time.setYear(2003)
      {
        context1.time.setMonth(2)
        const next2months = context1.clone()
        next2months.time.setMonth(context1.time.getMonth()! + 2)
        const s11 = relativeTimeTextBuilder.build(context1, next2months)
        expect(s11).toBe("avril")
      }
      context1.time.setMonth(9)
      const context2 = context1.clone()
      context2.time.setMonth(context2.time.getMonth()! + 1)
      const s1 = relativeTimeTextBuilder.build(context1, context2)
      expect(s1).toBe("le mois suivant")
      const context3 = context2.clone()
      context3.time.setDayOfMonth(23) // Resets day of month in context
      const s2 = relativeTimeTextBuilder.build(context2, context3)
      expect(s2).toBe("jeudi 23")
      const context4 = context3.clone()
      context4.time.setMonth(12)
      const s3 = relativeTimeTextBuilder.build(context3, context4)
      expect(s3).toBe("un mois plus tard")
      const context5 = context4.clone()
      context5.time.setMonth(1)
      context5.time.setDayOfMonth(24)
      const s4 = relativeTimeTextBuilder.build(context4, context5)
      expect(s4).toBe("vendredi 24 janvier")
    }
    {
      const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "<html lang='en'></html>")
      context.time.setYear(2003)
      context.time.setMonth(9)
      const previousContext = context.clone()
      context.time.setMonth(context.time.getMonth()! + 1)
      const s = relativeTimeTextBuilder.build(previousContext, context)
      expect(s).toBe("the month after")
    }
  })

  test("next day", () => {
    {
      const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "")
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      const previousContext = context.clone()
      expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003")
      context.time.setDayOfMonth(24)
      expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("le lendemain")
    }
    {
      const context = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "<html lang='en'></html>")
      context.time.setYear(2003)
      context.time.setMonth(9)
      context.time.setDayOfMonth(23)
      const previousContext = context.clone()
      expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003")
      context.time.setDayOfMonth(context.time.getDayOfMonth()! + 1)
      expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("the day after")
    }
  })

  describe("hour", () => {

    test("next", () => {
      {
        let previousContext = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "")
        const context = previousContext.clone()
        context.time.setYear(2003)
        context.time.setMonth(9)
        context.time.setDayOfMonth(23)
        context.time.setHour(16)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("mardi 23 septembre 2003 à 16 h")
        previousContext = context.clone()
        context.time.setHour(17)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("une heure plus tard")
        context.time.setMinutes(43)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("17:43")
      }
      {
        let previousContext = rr0TestUtil.time.newHtmlContext("1/9/9/0/08", "<html lang='en'></html>")
        const context = previousContext.clone()
        context.time.setYear(2003)
        context.time.setMonth(9)
        context.time.setDayOfMonth(23)
        context.time.setHour(16)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("Tuesday, September 23, 2003 at 04 PM")
        previousContext = context.clone()
        context.time.setHour(17)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("one hour later")
        context.time.setMinutes(43)
        expect(relativeTimeTextBuilder.build(previousContext, context)).toBe("05:43 PM")
      }
    })
  })
})
