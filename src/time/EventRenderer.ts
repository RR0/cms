import { HtmlRR0Context } from "../RR0Context.js"
import { SourceFactory, SourceRenderer } from "../source/index.js"
import { NoteRenderer } from "../note/index.js"
import { TimeElementFactory } from "./html/TimeElementFactory.js"
import assert from "assert"
import { RR0Data, RR0Event, RR0SourceType, Source } from "@rr0/data"
import { PlaceRenderer } from "../place/PlaceRenderer.js"
import { Place } from "@rr0/place"
import { TimeRenderOptions } from "./html/index.js"

/**
 * Render a case summary as HTML.
 */
export class EventRenderer<E extends RR0Event> {

  placeRenderer = new PlaceRenderer()

  constructor(
    protected noteRenderer: NoteRenderer, protected sourceFactory: SourceFactory,
    readonly sourceRenderer: SourceRenderer, protected timeElementFactory: TimeElementFactory
  ) {
  }

  placeElement(context: HtmlRR0Context, place: Place) {
    const doc = context.file.document
    const placeEl = doc.createElement("span")
    placeEl.className = "place"
    placeEl.textContent = this.placeRenderer.render(context, place) || ""
    return placeEl
  }

  async renderEnd(context: HtmlRR0Context, event: RR0Data, container: HTMLElement) {
    const sources = event.sources
    if (sources) {
      await this.renderSources(context, sources, container)
    }
    const notes = event.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
  }

  async render(context: HtmlRR0Context, event: E, container: HTMLElement,
               options: TimeRenderOptions = {url: true, contentOnly: false}) {
    const eventContext = context.clone()
    const eventTime = eventContext.time.date = event.time
    assert.ok(eventTime, `Event of type "${event.type}" has no time`)
    container.dataset.time = eventTime.toString()
    const timeEl = this.timeElementFactory.create(eventContext, context, options)
    container.append(timeEl)
    const place = event.place
    if (place) {
      container.append(" À ")
      container.append(this.placeElement(context, place))
    }
    container.append(", ", event.description)
    const notes = event.notes
    if (notes) {
      await this.renderNotes(context, notes, container)
    }
    const sources = event.sources
    if (sources) {
      await this.renderSources(context, sources, container)
    }
    container.append(".")
  }

  async renderNotes(context: HtmlRR0Context, notes: string[], container: HTMLElement) {
    for (const noteStr of notes) {
      const sourceEl = this.noteRenderer.render(context, noteStr)
      container.append(" ", sourceEl)
    }
  }

  async renderSources(context: HtmlRR0Context, sources: Source<RR0SourceType>[], container: HTMLElement) {
    for (const source of sources) {
      const href = source.url
      const resolvedSource = source.title || !href ? source : await this.sourceFactory.create(context, href.toString())
      const sourceEl = this.sourceRenderer.render(context, resolvedSource)
      container.append(" ", sourceEl)
    }
  }
}
