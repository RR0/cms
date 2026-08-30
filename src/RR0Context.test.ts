import { describe, expect, test } from "vitest"
import { cmsTestUtil } from "./test/CMSTestUtil.js"
import { ssgMessages } from "./lang/ssgMessages.js"

describe("RROContextImpl", () => {

  describe("constructor with locale", () => {

    test("default locale", () => {
      const context = cmsTestUtil.newHtmlContext("test.html", "")
      expect(context.locale).toBe("fr")
    })

    test("supported locale", () => {
      const context = cmsTestUtil.newHtmlContext("test.html", "", "en")
      expect(context.locale).toBe("en")
    })

    test("locale fallback to lang only", () => {
      const context = cmsTestUtil.newHtmlContext("test.html", "", "en-US")
      expect(context.messages).toEqual(ssgMessages["en"])
    })

    test("locale fallback to default", () => {
      const context = cmsTestUtil.newHtmlContext("test.html", "", "xx")
      expect(context.messages).toEqual(ssgMessages["fr"])
    })
  })
})
