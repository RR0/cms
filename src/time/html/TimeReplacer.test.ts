import { TimeReplacer } from "./TimeReplacer.js"
import { cmsTestUtil } from "../../test/CMSTestUtil.js"
import { describe, expect, test } from "vitest"
import { TimeRenderer } from "./TimeRenderer.js"
import { TimeElementFactory } from "./TimeElementFactory.js"
import { TimeTextBuilder } from "../text/TimeTextBuilder.js"
import path from "path"
import { TimeOptions } from "../TimeOptions.js"
import { TimeUrlBuilder } from "../TimeUrlBuilder.js"

describe("TimeReplacer", async () => {

  const timeRoot = cmsTestUtil.time.timeOptions.rootDir
  const timeOptions: TimeOptions = {
    rootDir: timeRoot,
    files: [
      path.join(timeRoot, "1/9/4/7/07/02/index.html"),
      path.join(timeRoot, "2/0/0/3/index.html"),
      path.join(timeRoot, "2/0/0/3/12/24/index.html"),
      path.join(timeRoot, "2/0/0/4/index.html"),
      path.join(timeRoot, "2/0/0/4/09/index.html"),
      path.join(timeRoot, "2/0/0/5/index.html"),
      path.join(timeRoot, "2/0/0/5/08/23/index.html"),
      path.join(timeRoot, "2/0/0/6/index.html"),
      path.join(timeRoot, "2/0/0/6/07/14/index.html"),
      path.join(timeRoot, "2/0/0/7/06/15/index.html")
    ]
  }
  const textBuilder = new TimeTextBuilder(cmsTestUtil.intlOptions)
  const timeRenderer = new TimeRenderer(new TimeUrlBuilder(timeOptions), textBuilder)
  const timeElementFactory = new TimeElementFactory(timeRenderer)
  const replacer = new TimeReplacer(timeElementFactory)

  function timeUrl(pathStr: string): string {
    return path.join("/", timeOptions.rootDir, pathStr, "index.html")
  }

  test("parses year", async () => {
    {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2003"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved"><a href="${path.join("/",
          cmsTestUtil.time.filePath("2/0/0/3/"))}"><time datetime="2003">2003</time></a></span>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
    {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.innerHTML = "2003\n      "
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/3/")}"><time datetime="2003">2003</time></a></span>`)
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(undefined)
      expect(context.time.getDayOfMonth()).toBe(undefined)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
      expect(context.time.getTimeZone()).toBe(undefined)
    }
  })

  test("parses interval", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    const interval = "2003/2004"
    const original = context.file.document.createElement("time")
    original.textContent = interval
    const replaced = await replacer.replacement(context, original)
    expect(replaced.outerHTML)
      .toBe(
        `<span class="time-interval"><span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/3/")}"><time datetime="2003">2003</time></a></span> à <span class="time-resolved"><a href="${path.join(
          "/",
          timeOptions.rootDir, "2/0/0/4/")}"><time datetime="2004">2004</time></a></span></span>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(undefined)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
    expect(context.time.getTimeZone()).toBe(undefined)
  })

  test("renders a year interval after a more precise date in the same year", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    const previous = context.file.document.createElement("time")
    previous.textContent = "1951-05"
    await replacer.replacement(context, previous)

    const interval = context.file.document.createElement("time")
    interval.textContent = "1951/1955"
    const replaced = await replacer.replacement(context, interval)

    expect(replaced.outerHTML).toBe(
      `<span class="time-interval"><span class="time-resolved"><time datetime="1951">1951</time></span> à <span class="time-resolved"><time datetime="1955">1955</time></span></span>`)
  })

  describe("renders an interval after \"between\" as \"between X and Y\"", () => {

    async function renderIn(locale: string, html: string): Promise<string> {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "", locale)
      const p = context.file.document.createElement("p")
      p.innerHTML = html
      const replaced = await replacer.replacement(context, p.querySelector("time"))
      return replaced.textContent
    }

    test("in French", async () => {
      expect(await renderIn("fr", "entre <time>1951/1955</time>")).toBe("1951 et 1955")
    })

    test("in English, through an inline element", async () => {
      expect(await renderIn("en", "anywhere between <strong><time>1951/1955</time></strong>")).toBe("1951 and 1955")
    })

    test("but not without the word", async () => {
      expect(await renderIn("fr", "de <time>1951/1955</time>")).toBe("1951 à 1955")
      expect(await renderIn("en", "from <time>1951/1955</time>")).toBe("1951 to 1955")
    })
  })

  describe("renders an EDTF season", () => {

    async function render(locale: string, value: string): Promise<string> {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "", locale)
      const el = context.file.document.createElement("time")
      el.textContent = value
      return (await replacer.replacement(context, el)).textContent
    }

    test("in French and English, instead of failing on month 23", async () => {
      expect(await render("fr", "1954-23")).toBe("automne 1954")
      expect(await render("en", "1954-22")).toBe("summer 1954")
    })

    test("after another date", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const previous = context.file.document.createElement("time")
      previous.textContent = "1954-10-16"
      await replacer.replacement(context, previous)
      const season = context.file.document.createElement("time")
      season.textContent = "1954-24"
      expect((await replacer.replacement(context, season)).textContent).toBe("hiver 1954")
    })
  })

  test("leaves a time with data-format=\"none\" as written", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    const el = context.file.document.createElement("time")
    el.dataset.format = "none"
    el.textContent = "Dans la nuit"
    const replaced = await replacer.replacement(context, el)
    expect(replaced).toBe(el)
    expect(replaced.outerHTML).toBe(`<time data-format="none">Dans la nuit</time>`)
  })

  test("parses unsupported", async () => {
    const interval = "moi"
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
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
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08", "")
      const original = context.file.document.createElement("time")
      original.textContent = "2003-12-24T10:22CDT"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML)
        .toBe(`<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/3/12/24/")}"><time datetime="2003-12-24T10:22-05">mercredi 24 décembre 2003 à 10:22</time></a></span>`)  // TODO: Text should have timezone info
      expect(context.time.getYear()).toBe(2003)
      expect(context.time.getMonth()).toBe(12)
      expect(context.time.getDayOfMonth()).toBe(24)
      expect(context.time.getHour()).toBe(10)
      expect(context.time.getMinutes()).toBe(22)
      expect(context.time.getTimeshift()).toBe("-05")
    }
    /*{
      const context = cmsTestUtil.newHtmlContext("time/1/9/9/0/08/index.html", "")
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
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08", "")
    const original = context.file.document.createElement("time")
    original.textContent = "2004-09"
    const replacement = await replacer.replacement(context, original)
    expect(replacement.outerHTML).toBe(
      `<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
        "2/0/0/4/09/")}"><time datetime="2004-09">septembre 2004</time></a></span>`)
    expect(context.time.getYear()).toBe(2004)
    expect(context.time.getMonth()).toBe(9)
    expect(context.time.getDayOfMonth()).toBe(undefined)
    expect(context.time.getHour()).toBe(undefined)
    expect(context.time.getMinutes()).toBe(undefined)
  })

  describe("parses day", () => {

    test("from full date", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2005-08-23"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/5/08/23/")}"><time datetime="2005-08-23">mardi 23 août 2005</time></a></span>`)
      expect(context.time.getYear()).toBe(2005)
      expect(context.time.getMonth()).toBe(8)
      expect(context.time.getDayOfMonth()).toBe(23)
      expect(context.time.getHour()).toBe(undefined)
      expect(context.time.getMinutes()).toBe(undefined)
    })
  })

  test("reset context", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    const timeEl = context.file.document.createElement("time")
    timeEl.textContent = "2005"
    const replacement = await replacer.replacement(context, timeEl)
    expect(replacement.outerHTML).toBe(`<span class="time-resolved"><a href="${cmsTestUtil.time.url(
      "2/0/0/5/")}"><time datetime="2005">2005</time></a></span>`)
    const original = context.file.document.createElement("time")
    const datetime = "2006"
    original.textContent = datetime
    const replacement2 = await replacer.replacement(context, original)
    expect(replacement2.outerHTML).toBe(`<span class="time-resolved"><a href="${cmsTestUtil.time.url(
      "2/0/0/6/")}"><time datetime="${datetime}" title="2006">l'année suivante</time></a></span>`)
  })

  describe("renders a time in full after a preposition", () => {

    async function renderAfter(locale: string, html: string): Promise<string> {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "", locale)
      const p = context.file.document.createElement("p")
      p.innerHTML = html
      const times = p.querySelectorAll("time")
      let replaced: HTMLElement
      for (const time of times) {
        replaced = await replacer.replacement(context, time)
      }
      return replaced.textContent
    }

    test("in French", async () => {
      expect(await renderAfter("fr", "<time>2005</time>. En <time>2006</time>")).toBe("2006")
      expect(await renderAfter("fr", "<time>2005</time>, jusqu'à <time>2006</time>")).toBe("2006")
      expect(await renderAfter("fr", "<time>2005</time>, d’<time>2006</time>")).toBe("2006")
    })

    test("in English", async () => {
      expect(await renderAfter("en", "<time>2005</time>. In <time>2006</time>")).toBe("2006")
    })

    test("but not without one", async () => {
      expect(await renderAfter("fr", "<time>2005</time>. Puis, <time>2006</time>")).toBe("l'année suivante")
    })

    test("including the one of an open interval", async () => {
      expect(await renderAfter("fr", "<time>2005</time>. <time>2006/</time>")).toBe("à partir de 2006")
      expect(await renderAfter("en", "<time>2005</time>. <time>2006/</time>")).toBe("starting 2006")
    })
  })

  test("avoids linking to current file", async () => {
    const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
    const timeEl = context.file.document.createElement("time")
    const datetime = "1954-10-01"
    timeEl.textContent = datetime
    const replacement = await replacer.replacement(context, timeEl)
    expect(replacement.outerHTML)
      .toBe(`<span class="time-resolved"><time datetime="${datetime}">vendredi 1 octobre 1954</time></span>`)
  })

  describe("parse duration", () => {

    test("with days, hours, minutes and seconds", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      const datetime = "P2D10H23M45S"
      timeEl.textContent = datetime
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<time datetime="${datetime}" class="duration">2 jours, 10 heures, 23 minutes et 45 secondes</time>`)
    })

    test("with context", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      {
        const ctxElement = context.file.document.createElement("time")
        ctxElement.textContent = "1947-07-02"
        const replacement1 = await replacer.replacement(context, ctxElement)
        expect(replacement1.outerHTML).toBe(`<span class="time-resolved"><a href="${cmsTestUtil.time.url(
          "1/9/4/7/07/02/")}"><time datetime="1947-07-02">mercredi 2 juillet 1947</time></a></span>`)
      }
      {
        const element = context.file.document.createElement("time")
        element.textContent = "P20M"
        const replacement = await replacer.replacement(context, element)
        expect(replacement.outerHTML).toBe(`<time datetime="P20M" class="duration">20 minutes</time>`)
      }
    })

    test("with approximation", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const original = context.file.document.createElement("time")
      original.textContent = "P~2H"
      const replacement = await replacer.replacement(context, original)
      expect(replacement.outerHTML).toBe(`<time datetime="P2H" class="duration">environ 2 heures</time>`)
    })
  })

  describe("parses hour", () => {

    test("with context", async () => {
      // Empty context
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = "2006-07-14 17:56"
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.outerHTML).toBe(
        `<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/6/07/14/")}"><time datetime="2006-07-14T17:56">vendredi 14 juillet 2006 à 17:56</time></a></span>`)
      expect(context.time.getYear()).toBe(2006)
      expect(context.time.getMonth()).toBe(7)
      expect(context.time.getDayOfMonth()).toBe(14)
      expect(context.time.getHour()).toBe(17)
      expect(context.time.getMinutes()).toBe(56)

      // Change day + hour
      const timeEl1 = context.file.document.createElement("time")
      timeEl1.textContent = "2007-06-15 18:47"
      const replacement1 = await replacer.replacement(context, timeEl1)
      expect(replacement1.outerHTML).toBe(
        `<span class="time-resolved"><a href="${path.join("/", timeOptions.rootDir,
          "2/0/0/7/06/15/")}"><time datetime="2007-06-15T18:47">vendredi 15 juin 2007 à 18:47</time></a></span>`)
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
  describe("partial values", () => {

    async function render(context, str: string): Promise<string> {
      const timeEl = context.file.document.createElement("time")
      timeEl.textContent = str
      const replacement = await replacer.replacement(context, timeEl)
      return replacement.textContent
    }

    test("day of the current month", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "19")).toBe("dimanche 19")
      expect(context.time.toString()).toBe("1990-08-19")
    })

    test("hour of the current day", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      await render(context, "12")
      expect(await render(context, "21:00")).toBe("21 h")
      expect(context.time.getDayOfMonth()).toBe(12)
      expect(context.time.getHour()).toBe(21)
      expect(await render(context, "23T~01:45")).toBe("jeudi 23 01:45")
      expect(await render(context, "00:19/00:30")).toBe("00:19 à 00:30")
      expect(context.time.getYear()).toBe(1990)
    })

    test("hour of an unknown day is not read as a year", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/index.html", "")
      expect(await render(context, "07:30")).toBe("07:30")
      expect(context.time.getYear()).toBe(1990)
    })

    test("interval end relative to its start", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "1517-05-22 21:00/22:00")).toBe("mardi 22 mai 1517 à 21 h à 22 h")
      expect(await render(context, "02 20:00/03 05:00")).toBe("mercredi 2 20 h à jeudi 3 05 h")
      expect(await render(context, "27 23:00/03:00")).toBe("dimanche 27 23 h à lundi 28 03 h")
    })

    test("date without hour after an hour of the previous day", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      await render(context, "1998-08-09 22:00")
      expect(await render(context, "1998-08-10")).toBe("lundi 10")
    })

    test("range of durations", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "P10M/12M")).toBe("10 minutes à 12 minutes")
      expect(await render(context, "P15S/20s")).toBe("15 secondes à 20 secondes")
    })

    test("words around the value are kept", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "1964-04-27Tle soir")).toBe("lundi 27 avril 1964 le soir")
      expect(await render(context, "28Tpeu après minuit")).toBe("le lendemain peu après minuit")
      expect(await render(context, "vers\u00a010:50")).toBe("vers\u00a010:50")
    })

    test("words are not read as a time", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "1 h après le coucher du soleil")).toBe("1 h après le coucher du soleil")
      expect(await render(context, "12 mars 1977")).toBe("12 mars 1977")
      expect(context.time.toString()).toBe("1990-08")
    })

    test("time zone is part of the value", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "1947-06-24 21:45PST")).toBe("mardi 24 juin 1947 à 21:45")
    })

    test("time inside a link gets no link of its own", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      const doc = context.file.document
      const a = doc.createElement("a")
      a.href = "/science/crypto/ufo/enquete/dossier/5Novembre/index.html"
      const timeEl = doc.createElement("time")
      timeEl.textContent = "2003"
      a.append(timeEl)
      doc.body.append(a)
      const replacement = await replacer.replacement(context, timeEl)
      expect(replacement.querySelector("a")).toBe(null)
      expect(replacement.textContent).toBe("2003")
    })

    test("season does not break the next time", async () => {
      const context = cmsTestUtil.time.newHtmlContext("1/9/9/0/08/index.html", "")
      expect(await render(context, "1990-21")).toBe("printemps 1990")
      expect(await render(context, "-0033")).toBe("33 av. J.-C.")
    })
  })
})
