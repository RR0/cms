import { TimeReplacer } from "./TimeReplacer"
import { rr0TestUtil } from "../test"
import { describe, expect, test } from "@javarome/testscript"
import { TimeRenderer } from "./TimeRenderer"
import { TimeElementFactory } from "./TimeElementFactory"
import { TimeTextBuilder } from "./TimeTextBuilder"

describe("TimeReplacer", () => {

  const textBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
  const timeRenderer = new TimeRenderer(
    ["time/1/9/4/7/07/02/index.html", "time/2/0/0/3/index.html", "time/2/0/0/3/12/24/index.html", "time/2/0/0/4/index.html", "/time/2/0/0/4/09/index.html", "time/2/0/0/5/08/23/index.html", "time/2/0/0/6/07/14/index.html", "/time/2/0/0/7/06/15/index.html"],
    textBuilder)
  const timeElementFactory = new TimeElementFactory(timeRenderer)
  const replacer = new TimeReplacer(timeElementFactory)

  test("parses year", async () => {
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2003"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved">en <a href="/src/time/2/0/0/3/"><time datetime="2003">2003</time></a></span>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.innerHTML = "2003\n      "
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(`<a href="/src/time/2/0/0/3/"><time datetime="2003">2003</time></a>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
  })

  test("parses interval", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const interval = "2003/2004"
    const original = context.file.document.createElement("time")
    original.textContent = interval
    const replaced = await replacer.replacement(context, original)
    expect(replaced.outerHTML)
      .toBe(
        `<span class="time-interval"><span class="time-resolved">en <a href="/src/time/2/0/0/3/"><time datetime="2003">2003</time></a></span> à <span class="time-resolved">en <a href="/src/time/2/0/0/4/"><time datetime="2004">2004</time></a></span></span>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses unsupported", async () => {
    const interval = "moi"
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const original = context.file.document.createElement("time")
    original.textContent = interval
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML).toBe(`<time>moi</time>`)
    expect(context.time.getYear()).toBe(1990)
    expect(context.time.getMonth()).toBe(8)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("parses timezone", async () => {
    {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const original = context.file.document.createElement("time")
      original.textContent = "2003-12-24T10:22CDT"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML)
        .toBe(
          `<span class="time-resolved">le <a href="/src/time/2/0/0/3/12/24/"><time datetime="2003-12-24T10:22-05">mercredi 24 décembre 2003 à 10:22</time></a></span>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(10)
      expect(context.time.getMinutes()).toBe(22)
      expect(context.time.getTimeshift()).toBe("-05")
    }
    /*{
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const interval = "2003-12-24 (CDT)"
      const replacer = new TimeReplacer(["time/2/0/0/3/12/24"])
      expect(replacer.replacement(context, `<time>${interval}</time>`, interval))
        .toBe(`<a href="/time/2/0/0/3/12/24/">mercredi 24 décembre 2003</a>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe("CDT")
    }*/
  })

  test("parses month", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const original = context.file.document.createElement("time")
    original.textContent = "2004-09"
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML).toBe(
      `<span class="time-resolved">en <a href="/src/time/2/0/0/4/"><time datetime="2004-09">septembre 2004</time></a></span>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(9)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
  })

  describe("parses day", () => {

    test("from full date", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2005-08-23"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved">le <a href="/src/time/2/0/0/5/08/23/"><time datetime="2005-08-23">mardi 23 août 2005</time></a></span>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })
  })

  test("reset context", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const timeEl = context.file.document.createElement("time")
    timeEl.textContent = "2005"
    const replacement = await replacer.replacement(context, timeEl)
    expect(replacement.outerHTML).toBe(`<a href="/src/time/2/0/0/5/">2005</a>`)
    const original = context.file.document.createElement("time")
    original.textContent = "2006"
    const replacement2 = await replacer.replacement(context, original)
    expect(replacement2.outerHTML).toBe(`<a href="/src/time/2/0/0/6/">2006</a>`)
  })

  test("avoids linking to current file", async () => {
    const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
    const timeEl = context.file.document.createElement("time")
    timeEl.textContent = "1954-10-01"
    const replacement = await replacer.replacement(context, timeEl)
    expect(replacement.outerHTML)
      .toBe(`<span class="time">vendredi 1 octobre 1954</span>`)
  })

  describe("parse duration", () => {

    test("with days, hours, minutes and seconds", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "P2D10H23M45S"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(`<time class="duration">2 jours, 10 heures, 23 minutes et 45 secondes</time>`)
    })

    test("with context", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeRenderer = new TimeRenderer(["time/1/9/4/7/07/02/index.html"], textBuilder)
      {
        const ctxElement = context.file.document.createElement("time")
        ctxElement.textContent = "1947-07-02"
        const replacement1 = await replacer.replacement(context, ctxElement)
        expect(replacement1.outerHTML).toBe(`<span class="time">mercredi 2 juillet 1947</span>`)
      }
      {
        const element = context.file.document.createElement("time")
        element.textContent = "P20M"
        const replacement = await replacer.replacement(context, element)
        expect(replacement.outerHTML).toBe(`<time class="duration">20 minutes</time>`)
      }
    })

    test("with approximation", async () => {
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const original = context.file.document.createElement("time")
      original.textContent = "~P2H"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML).toBe(`<time class="duration">environ 2 heures</time>`)
    })
  })

  describe("parses hour", () => {

    test("with context", async () => {
      // Empty context
      const context = rr0TestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2006-07-14 17:56"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(`<a href="/src/time/2/0/0/6/07/14/">vendredi 14 juillet 2006 à 17:56</a>`)
      expect(context.time.getYear()).toBe(2006)
      expect(context.time.getMonth()).toBe(7)
      expect(context.time.getDayOfMonth()).toBe(14)
      expect(context.time.getHour()).toBe(17)
      expect(context.time.getMinutes()).toBe(56)

      // Change day + hour
      const timeEl1 = context.file.document.createElement("time")
      timeEl1.textContent = "2007-06-15 18:47"
      const replacement1 = await replacer.replacement(context, timeEl)
      expect(replacement1.outerHTML).toBe(`<a href="/src/time/2/0/0/7/06/15/">vendredi 15 juin 2007 à 18:47</a>`)
      expect(context.time.getYear()).toBe(2007)
      expect(context.time.getMonth()).toBe(6)
      expect(context.time.getDayOfMonth()).toBe(15)
      expect(context.time.getHour()).toBe(18)
      expect(context.time.getMinutes()).toBe(47)

      // TODO: Change hour only
    })

    test("with approximation", async () => {
    })
  })
})