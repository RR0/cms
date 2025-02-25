import { HtmlRR0Context, RR0Context } from "../../RR0Context.js"
import { TimeTextBuilder } from "../text/TimeTextBuilder.js"
import { RelativeTimeTextBuilder } from "../text/RelativeTimeTextBuilder.js"
import { UrlUtil } from "../../util/url/UrlUtil.js"
import { TimeReplacer } from "./TimeReplacer.js"
import { TimeUrlBuilder } from "../TimeUrlBuilder"

export interface TimeRenderOptions {
  url: boolean
  contentOnly: boolean
}

export class TimeRenderer {

  protected readonly relativeTextBuilder: RelativeTimeTextBuilder

  constructor(readonly urlBuilder: TimeUrlBuilder, protected textBuilder: TimeTextBuilder) {
    this.relativeTextBuilder = new RelativeTimeTextBuilder(textBuilder)
  }

  render(context: HtmlRR0Context, previousContext?: RR0Context,
         options: TimeRenderOptions = {url: true, contentOnly: false}): HTMLElement {
    const {result, replacement} = this.renderContent(context, previousContext, options)
    if (!options.contentOnly) {
      const timeMessages = context.messages.context.time
      const time = context.time
      const message = time.getDayOfMonth() ? timeMessages.on : timeMessages.in
      result.append(message(time.approximate))
    }
    result.append(replacement)
    return result
  }

  renderContent(context: HtmlRR0Context, previousContext: RR0Context, options: TimeRenderOptions,
                renderOptions: Intl.DateTimeFormatOptions = this.textBuilder.options): {
    result: HTMLElement,
    replacement: HTMLElement
  } {
    const time = context.time
    const date = time.date
    const absoluteTimeUrl = this.urlBuilder.fromEdtf(date)
    const title = this.textBuilder.build(context, renderOptions)
    const text = (previousContext ? this.relativeTextBuilder.build(previousContext, context) : undefined) || title
    const file = context.file
    const currentFileName = file.name
    const doc = file.document
    let replacement: HTMLElement | undefined
    const timeEl = TimeReplacer.resolvedTime(context, date.toString())
    if (title !== text) {
      timeEl.title = title
    }
    timeEl.textContent = text
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const existingUrl = options.url && this.urlBuilder.matchExistingTimeFile(absoluteTimeUrl)
    if (existingUrl && existingUrl !== dirName) {
      const a = replacement = doc.createElement("a") as HTMLAnchorElement
      a.href = UrlUtil.absolute(existingUrl)
      a.append(timeEl)
    } else {
      replacement = timeEl
    }
    const result = file.document.createElement("span")
    result.className = "time-resolved"
    return {result, replacement}
  }
}
