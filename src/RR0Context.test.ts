import { describe, expect, test } from "@javarome/testscript"
import { rr0TestUtil } from "./test"
import { ssgMessages } from "./lang"

describe("RROContextImpl", () => {

  describe("constructor with locale", () => {

    test("default locale", () => {
      const context = rr0TestUtil.time.newHtmlContext("test.html", "")
      expect(context.locale).toBe("fr")
    })

    test("supported locale", () => {
      const context = rr0TestUtil.time.newHtmlContext("test.html", "", "en")
      expect(context.locale).toBe("en")
    })

    test("locale fallback to lang only", () => {
      const context = rr0TestUtil.time.newHtmlContext("test.html", "", "en-US")
      expect(context.messages).toEqual(ssgMessages["en"])
    })

    test("locale fallback to default", () => {
      const context = rr0TestUtil.time.newHtmlContext("test.html", "", "xx")
      expect(context.messages).toEqual(ssgMessages["fr"])
    })
  })
})
