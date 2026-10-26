import { describe, expect, test } from "vitest"
import { ImageCommand } from "./ImageCommand.js"
import { cmsTestUtil } from "./test/CMSTestUtil.js"

describe("ImageCommand", () => {

  async function images(body: string): Promise<HTMLImageElement[]> {
    const context = cmsTestUtil.newHtmlContext("test.html", `<html><body>${body}</body></html>`)
    await new ImageCommand("out", 275, 500).execute(context)
    return Array.from(context.file.document.querySelectorAll("img"))
  }

  test("lazy-loads every image but the first", async () => {
    const [first, second, third] = await images(`<img src="https://rr0.org/a.jpg"><p>Text</p><img src="https://rr0.org/b.jpg"><img src="https://rr0.org/c.jpg">`)
    expect(first.hasAttribute("loading")).toBe(false)
    expect(second.getAttribute("loading")).toBe("lazy")
    expect(third.getAttribute("loading")).toBe("lazy")
  })

  test("decodes every image asynchronously", async () => {
    const imgs = await images(`<img src="https://rr0.org/a.jpg"><img src="https://rr0.org/b.jpg">`)
    expect(imgs.map(img => img.getAttribute("decoding"))).toEqual(["async", "async"])
  })

  test("keeps an author's own loading", async () => {
    const [, second] = await images(`<img src="https://rr0.org/a.jpg"><img src="https://rr0.org/b.jpg" loading="eager">`)
    expect(second.getAttribute("loading")).toBe("eager")
  })

  test("ignores raw images", async () => {
    const [raw, first, second] = await images(`<img class="raw" src="https://rr0.org/logo.png"><img src="https://rr0.org/a.jpg"><img src="https://rr0.org/b.jpg">`)
    expect(raw.hasAttribute("decoding")).toBe(false)
    expect(first.hasAttribute("loading")).toBe(false)
    expect(second.getAttribute("loading")).toBe("lazy")
  })
})
