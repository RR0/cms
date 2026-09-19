import { describe, expect, test } from "vitest"
import { RR0Data, RR0Event } from "@rr0/data"
import { HtmlRR0Context } from "./RR0Context.js"
import { DataContentVisitor } from "./DataContentVisitor.js"
import { cmsTestUtil } from "./test/CMSTestUtil.js"

class TestDataContentVisitor extends DataContentVisitor {

  constructor() {
    super(undefined, {renderEnd: async () => undefined} as any, undefined)
  }

  renderImage(context: HtmlRR0Context, event: RR0Event) {
    return this.processImage(context, event)
  }

  renderEvent(context: HtmlRR0Context, event: RR0Event, data: RR0Data) {
    return this.processEvent(context, event, data)
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

  const sightingEvent = { type: "event", eventType: "sighting", url: "sighting.json" } as RR0Event
  const aCase = { type: "case", events: [sightingEvent] } as unknown as RR0Data

  test("inserts the UFO@home player on the case, for a case with a sighting and no player", async () => {
    const context = cmsTestUtil.newHtmlContext("people/v/VertongenJeanLuc/index.html",
      "<div class=\"contents\"><p>Le dossier</p></div>")
    const visitor = new TestDataContentVisitor()

    await visitor.renderEvent(context, sightingEvent, aCase)
    await visitor.renderEvent(context, sightingEvent, aCase)

    const players = context.file.document.querySelectorAll(".contents > rr0-sighting")
    expect(players.length).toBe(1)
    expect(players[0].getAttribute("src")).toBe("case.json")
    const script = context.file.document.querySelector(".contents > script")
    expect(script?.getAttribute("src")).toBe(DataContentVisitor.SIGHTING_PLAYER_SCRIPT)
    expect(script?.getAttribute("type")).toBe("module")
    // Nothing else: no dated paragraph per sighting, which a sighting without a time used to fail the build on.
    expect(context.file.document.querySelectorAll(".contents > p").length).toBe(1)
  })

  test("leaves a player the page's author placed alone", async () => {
    const context = cmsTestUtil.newHtmlContext("people/v/VertongenJeanLuc/index.html",
      "<div class=\"contents\"><p>Le dossier</p><rr0-sighting src=\"case.json\" show-witness-map></rr0-sighting></div>")
    const visitor = new TestDataContentVisitor()

    await visitor.renderEvent(context, sightingEvent, aCase)

    expect(context.file.document.querySelectorAll("rr0-sighting").length).toBe(1)
    expect(context.file.document.querySelectorAll("script").length).toBe(0)
  })
})
