import { describe, expect, test } from "vitest"
import { UnitReplaceCommand } from "./UnitReplaceCommand.js"
import { cmsTestUtil } from "../test/CMSTestUtil.js"

describe("UnitReplaceCommand", () => {

  const quantity = (value: string, unit: string, text = "") => `<span itemscope itemtype="https://schema.org/QuantitativeValue"><span itemprop="value">${value}</span> <span itemprop="unitCode" content="${unit}">${text}</span></span>`

  async function convert(value: string, unit: string, locale = "fr", text = ""): Promise<string> {
    const context = cmsTestUtil.newHtmlContext("test.html", `<p>${quantity(value, unit, text)}</p>`, locale)
    await new UnitReplaceCommand().execute(context)
    const p = context.file.document.querySelector("p")
    return p.textContent.replace(/[  ]/g, " ")
  }

  describe("fr", () => {

    test("statute mile", async () => {
      expect(await convert("10", "SMI")).toBe("16 km")
      expect(await convert("1.75", "SMI")).toBe("2,8 km")
    })

    test("foot", async () => {
      expect(await convert("4", "FOT")).toBe("1,2 m")
      expect(await convert("1000", "FOT")).toBe("305 m")
      expect(await convert("60000", "FOT")).toBe("18 288 m")
    })

    test("mile per hour", async () => {
      expect(await convert("1300", "HM")).toBe("2 092 km/h")
    })

    test("inch", async () => {
      expect(await convert("10", "INH")).toBe("25 cm")
    })

    test("nautical mile", async () => {
      expect(await convert("165.9", "NMI")).toBe("307 km")
      expect(await convert("0.25", "NMI")).toBe("0,5 km")
    })

    test("knot", async () => {
      expect(await convert("100", "KTS")).toBe("185 km/h")
      expect(await convert("100", "KNT")).toBe("185 km/h")
    })

    test("pound", async () => {
      expect(await convert("200", "LBR")).toBe("91 kg")
    })

    test("decimal comma", async () => {
      expect(await convert("653,5", "NMI")).toBe("1 210 km")
    })

    test("small values keep a significant digit", async () => {
      expect(await convert("0.1", "FOT")).toBe("0,03 m")
    })

    test("title keeps the original value", async () => {
      const context = cmsTestUtil.newHtmlContext("test.html", `<p>${quantity("165.9", "NMI")}</p>`)
      await new UnitReplaceCommand().execute(context)
      expect(context.file.document.querySelector("p span").getAttribute("title")).toBe("165.9 NMI")
    })
  })

  describe("en", () => {

    test("inch", async () => {
      expect(await convert("10", "INH", "en")).toBe("25 cm")
    })

    test("thousands", async () => {
      expect(await convert("1300", "HM", "en")).toBe("2,092 km/h")
    })

    test("decimals", async () => {
      expect(await convert("4", "FOT", "en")).toBe("1.2 m")
    })
  })

  describe("unconverted", () => {

    test("unknown unit keeps the original text", async () => {
      expect(await convert("3", "XYZ", "fr", "parsecs")).toBe("3 parsecs")
    })

    test("non-numeric value keeps the original text", async () => {
      expect(await convert("a few", "FOT", "fr", "feet")).toBe("a few feet")
    })
  })
})
