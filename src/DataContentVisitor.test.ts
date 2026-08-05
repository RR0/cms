import { describe, expect, test } from "@javarome/testscript"
import { RR0Event } from "@rr0/data"
import { HtmlRR0Context } from "./RR0Context.js"
import { DataContentVisitor } from "./DataContentVisitor.js"
import { cmsTestUtil } from "./test/index.js"

class TestDataContentVisitor extends DataContentVisitor {

  constructor() {
    super(undefined, {renderEnd: async () => undefined} as any, undefined)
  }

  renderImage(context: HtmlRR0Context, event: RR0Event) {
    return this.processImage(context, event)
  }
}

describe("DataContentVisitor", () => {

  const portraitEvent = {
    eventType: "image",
    name: "Portrait",
    title: "Louis de Broglie",
    url: "portrait.jpg"
  } as RR0Event

  test("insert portrait image when contents has no image", async () => {
    const context = cmsTestUtil.newHtmlContext("people/v/VertongenJeanLuc/index.html",
      "<div class=\"contents\"><p>Biographie</p></div>")
    const visitor = new TestDataContentVisitor()

    await visitor.renderImage(context, portraitEvent)

    const figure = context.file.document.querySelector(".contents > figure")
    expect(figure?.querySelector("img")?.getAttribute("src")).toBe("portrait.jpg")
    expect(figure?.querySelector("figcaption")?.textContent).toBe("Portrait")
  })

  test("does not insert a portrait image already present", async () => {
    const context = cmsTestUtil.newHtmlContext("people/v/VertongenJeanLuc/index.html",
      "<div class=\"contents\"><img src=\"portrait.jpg\"><p>Biographie</p></div>")
    const visitor = new TestDataContentVisitor()

    await visitor.renderImage(context, portraitEvent)

    expect(context.file.document.querySelectorAll(".contents img[src=\"portrait.jpg\"]").length).toBe(1)
  })
})
