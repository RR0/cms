import { HtmlRR0SsgContext, RR0SsgContext } from "../RR0SsgContext.js"
import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { RelativeTimeTextBuilder } from "./RelativeTimeTextBuilder.js"
import { UrlUtil } from "../util/url/UrlUtil.js"
import { TimeReplacer } from "./TimeReplacer.js"
import { TimeService } from "./TimeService"

export interface TimeRenderOptions {
  url: boolean
}

export class TimeRenderer {

  constructor(readonly service: TimeService, protected textBuilder: TimeTextBuilder) {
  }

  render(context: HtmlRR0SsgContext, previousContext?: RR0SsgContext,
         options: TimeRenderOptions = {url: true}): HTMLElement {
    const {result, replacement} = this.renderContent(context, previousContext, options)
    const timeMessages = context.messages.context.time
    const time = context.time
    if (time.getDayOfMonth()) {
      result.append(timeMessages.on(time.approximate), replacement)
    } else {
      result.append(timeMessages.in(time.approximate), replacement)
    }
    return result
  }

  renderContent(context: HtmlRR0SsgContext, previousContext: RR0SsgContext, options: TimeRenderOptions,
                renderOptions: Intl.DateTimeFormatOptions = this.textBuilder.options): {
    result: HTMLElement,
    replacement: HTMLElement
  } {
    const time = context.time
    const absoluteTimeUrl = this.service.urlBuilder.fromContext(time)
    const title = this.textBuilder.build(context, true, renderOptions)
    let text = previousContext ? new RelativeTimeTextBuilder(this.textBuilder).build(previousContext,
      context) : undefined
    if (!text) {
      text = title
    }
    const file = context.file
    const currentFileName = file.name
    const doc = file.document
    let replacement: HTMLElement | undefined
    const timeEl = TimeReplacer.resolvedTime(context, time.toString())
    if (title !== text) {
      timeEl.title = title
    }
    timeEl.textContent = text
    const dirName = currentFileName.substring(0, currentFileName.indexOf("/index"))
    const existingUrl = options.url && this.service.matchExistingTimeFile(absoluteTimeUrl)
    if (existingUrl && existingUrl !== dirName) {
      const a = replacement = doc.createElement("a") as HTMLAnchorElement
      a.href = UrlUtil.absolute(existingUrl)
      a.append(timeEl)
    } else {
      replacement = timeEl
    }
    let result = context.file.document.createElement("span")
    result.className = "time-resolved"
    return {result, replacement}
  }
}
