import path from "path"
import assert from "assert"
import { TimeElementFactory } from "./time/html/TimeElementFactory.js"
import { ContentVisitor } from "./RR0ContentStep.js"
import { HtmlRR0Context } from "./RR0Context.js"
import { EventRenderer } from "./time/EventRenderer.js"
import { AllDataService, People, RR0Data, RR0Event } from "@rr0/data"

/**
 * Insert content in context file, according to data found in .json files aside of it.
 */
export class DataContentVisitor implements ContentVisitor {

  constructor(protected service: AllDataService, protected eventRenderer: EventRenderer<RR0Event>,
              protected timeElementFactory: TimeElementFactory) {
  }

  async visit(context: HtmlRR0Context) {
    const dirName = path.dirname(context.file.name)
    const dataList = await this.service.getFromDir(dirName,
      ["people", "case", "sighting", "api", "product", "org"],
      ["index.json", "case.json", "people.json", "api.json", "org.json"])
    if (dataList.length > 0) {
      for (const data of dataList) {
        switch (data.type) {
          case "people":
            context.people = data as People
            break
        }
        await this.process(context, data)
      }
    }
  }

  protected async process(context: HtmlRR0Context, data: RR0Data) {
    this.processTitle(context, data)
    this.processURL(context, data)
    const events = data.events.sort(
      (event1, event2) => event1.time ? event2.time ? event1.time.isBefore(event2.time) ? -1 : 1 : -1 : 1)
    for (const event of events) {
      await this.processEvent(context, event, data)
    }
    context.file.contents = context.file.serialize()
  }

  protected async processEvent(context: HtmlRR0Context, event: RR0Event, data: RR0Data) {
    switch (event.eventType) {
      case "birth":
        await this.processBirth(context, event, data)
        break
      case "book":
        await this.processBook(context, event, data)
        break
      case "image":
        await this.processImage(context, event)
        break
      case "death":
        await this.processDeath(context, event, data)
        break
      default:
        const {eventP, timeEl} = this.timeParagraph(context, event)
        await this.eventRenderer.render(context, event, eventP)
        context.file.document.append(eventP)
    }
  }

  protected timeParagraph(context: HtmlRR0Context, event: RR0Event) {
    const container = context.file.document.createElement("p")
    const eventContext = context.clone()
    const eventTime = eventContext.time.date = event.time
    assert.ok(eventTime, `Event of type "${event.type}" has no time for paragraph`)
    container.dataset.time = eventTime.toString()
    const timeEl = this.timeElementFactory.create(eventContext, context, {url: true, contentOnly: false})
    return {eventP: container, timeEl}
  }

  protected async processImage(context: HtmlRR0Context, event: RR0Event) {
    const doc = context.file.document
    const contents = doc.querySelector(".contents")
    if (contents) {
      const imgEl = contents.querySelector("img")
      const eventCaption = event.name
      const eventSsrc = event.url
      if (imgEl && ![imgEl.src, path.join("/", path.dirname(context.file.name), imgEl.src)].includes(eventSsrc)) {
        const imgEl = doc.createElement("img")
        imgEl.src = eventSsrc
        imgEl.alt = event.title
        const figcaptionEl = doc.createElement("figcaption")
        figcaptionEl.innerHTML = eventCaption
        await this.eventRenderer.renderEnd(context, event, figcaptionEl)
        const figureEl = doc.createElement("figure")
        figureEl.append(imgEl)
        figureEl.append(figcaptionEl)
        const insertEl = contents.querySelector("*")
        contents.insertBefore(figureEl, insertEl)
      }
    }
  }

  protected async processBirth(context: HtmlRR0Context, event: RR0Event, entity: RR0Data) {
    const parentEl = context.file.document.querySelector(".contents")
    if (parentEl) {
      const {eventP, timeEl} = this.timeParagraph(context, event)
      const name = entity.surname ? `"${entity.surname}"` : entity.name || entity.title
      eventP.append(name)
      eventP.append(context.messages[entity.type].birth)
      eventP.append(timeEl)
      const eventPlace = event.place
      if (eventPlace) {
        eventP.append(" à ")
        eventP.append(this.eventRenderer.placeElement(context, eventPlace))
      }
      await this.eventRenderer.renderEnd(context, event, eventP)
      const allExergues = context.file.document.querySelectorAll(".exergue")
      const insertEl = allExergues[allExergues.length - 1]?.nextElementSibling || parentEl.firstElementChild
      parentEl.insertBefore(eventP, insertEl)
    } else {
      context.warn("no .content in", context.file.name)
    }
  }

  protected async processDeath(context: HtmlRR0Context, event: RR0Event, entity: RR0Data) {
    const {eventP, timeEl} = this.timeParagraph(context, event)
    const name = entity.name
    eventP.append(name)
    eventP.append(context.messages[entity.type].death)
    eventP.append(timeEl)
    if (event.place) {
      eventP.append(" à ")
      const birthPlace = this.eventRenderer.placeElement(context, event.place)
      eventP.append(birthPlace)
    }
    await this.eventRenderer.renderEnd(context, event, eventP)
    const insertEl = context.file.document.querySelector(".contents > p:last-of-type")
    if (insertEl) {
      insertEl.parentNode.append(eventP)
    }
  }

  protected async processBook(context: HtmlRR0Context, event: RR0Event, bookData: RR0Data) {
    const doc = context.file.document
    const parentEl = doc.querySelector(".contents")
    if (parentEl) {
      const {eventP, timeEl} = this.timeParagraph(context, event)
      eventP.append(timeEl, " ")
      const people = context.people as unknown as People
      eventP.append((people.gender === "female" ? "elle" : "il") + " écrit un livre")
      await this.eventRenderer.renderEnd(context, event, eventP)
      parentEl.append(eventP)
    } else {
      context.warn("no .content in " + context.file.name)
    }
  }

  protected processTitle(context: HtmlRR0Context, data: RR0Data) {
    const doc = context.file.document
    if (!doc.title) {
      context.file.title = doc.title = data.title
    }
  }

  protected processURL(context: HtmlRR0Context, data: RR0Data) {
    const url = data.url
    if (url && !context.file.meta.url) {
      context.file.meta.url = url as unknown as string
    }
  }
}
