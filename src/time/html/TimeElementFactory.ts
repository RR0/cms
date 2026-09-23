import { HtmlRR0Context, RR0Context } from "../../RR0Context.js"
import { TimeRenderer, TimeRenderOptions } from "./TimeRenderer.js"
import { TimeReplacer } from "./TimeReplacer.js"
import { Level2Interval } from "@rr0/time"

/**
 * Creates <time> elements from time strings.
 */
export class TimeElementFactory {

  constructor(readonly renderer: TimeRenderer) {
  }

  create(context: HtmlRR0Context, previousContext: HtmlRR0Context | undefined,
         options: TimeRenderOptions): HTMLElement | undefined {
    let replacement: HTMLElement | undefined
    const time = context.time
    const interval = time.interval as Level2Interval
    if (interval) {
      const fromContext = context.clone()
      fromContext.time.date = interval.start
      let end = interval.end
      if (end) {
        const toContext = context.clone()
        toContext.time.date = end
        context.time = toContext.time // Latest date is current date
        replacement = this.createInterval(fromContext, toContext, previousContext, options)
      } else {
        replacement = this.createStarting(fromContext, previousContext, options)
      }
    }
    if (!replacement) {
      replacement = this.valueReplacement(context, previousContext, options)
    }
    return replacement
  }

  createInterval(fromContext: HtmlRR0Context, toContext: HtmlRR0Context, previousContext: HtmlRR0Context,
                 options: TimeRenderOptions): HTMLElement | undefined {
    let replacement: HTMLElement
    options = {...options, relativeWords: false}  // "the day after at 22 h" can't start or end an interval
    const startReplacement = this.valueReplacement(fromContext, previousContext, options)
    if (startReplacement) {
      const from = fromContext.time
      const to = toContext.time
      const sameDay = from.getDayOfMonth() && from.getYear() === to.getYear() && from.getMonth() === to.getMonth()
        && from.getDayOfMonth() === to.getDayOfMonth()
      const endReplacement = sameDay  // "21:00/22:00" ends at "22 h", not at "Tuesday 22 May 1517 at 22 h"
        ? this.valueReplacement(toContext, fromContext, options)
        : this.valueReplacement(toContext, previousContext, options)
      if (endReplacement && endReplacement.outerHTML !== startReplacement.outerHTML) {
        replacement = fromContext.file.document.createElement("span")
        replacement.className = "time-interval"
        const timeMessages = fromContext.messages.context.time
        replacement.innerHTML = options.between
          ? timeMessages.betweenAnd(startReplacement.outerHTML, endReplacement.outerHTML)
          : timeMessages.fromTo(startReplacement.outerHTML, endReplacement.outerHTML)
      }
    }
    return replacement
  }

  protected createStarting(fromContext: HtmlRR0Context, previousContext: HtmlRR0Context,
                 options: TimeRenderOptions): HTMLElement | undefined {
    const {result, replacement} = this.renderer.renderContent(fromContext, previousContext, options)
    let startingReplacement: HTMLElement
    startingReplacement = fromContext.file.document.createElement("span")
    startingReplacement.className = "time-interval"
    const approximate = !fromContext.time.getDayOfMonth()
    startingReplacement.innerHTML = fromContext.messages.context.time.starting(approximate) + " " + result.outerHTML
    result.append(startingReplacement, replacement)
    return result
  }

  protected valueReplacement(context: HtmlRR0Context, previousContext: RR0Context | undefined,
                             options: TimeRenderOptions = {url: true, contentOnly: false}): HTMLElement | undefined {
    let replacement: HTMLElement | undefined
    if (context.time.duration) {
      replacement = this.durationReplacement(context)
    } else {
      replacement = this.dateTimeReplacement(context, previousContext, options)
    }
    return replacement
  }

  protected durationReplacement(context: HtmlRR0Context): HTMLTimeElement | undefined {
    const duration = context.time.duration
    const items = []
    const messages = context.messages.context.time.duration
    const datetime = duration.toString()
    const spec = duration.toSpec()
    const days = spec.days
    if (days) {
      items.push(messages.days(days.value))
    }
    const hours = spec.hours
    if (hours) {
      items.push(messages.hours(hours.value))
    }
    const minutes = spec.minutes
    if (minutes) {
      items.push(messages.minutes(minutes.value))
    }
    const seconds = spec.seconds
    if (seconds) {
      items.push(messages.seconds(seconds.value))
    }
    let replacement: HTMLTimeElement | undefined
    if (items.length > 0) {
      let replacementStr = items.join(", ")
      if (items.length > 1) {
        let last = replacementStr.lastIndexOf(", ")
        replacementStr = replacementStr.substring(0, last) + messages.lastSeparator + items[items.length - 1]
      }
      if (context.time.approximate) {
        replacementStr = messages.approximate(replacementStr)
      }
      replacement = TimeReplacer.resolvedTime(context, datetime)
      replacement.classList.add("duration")
      replacement.textContent = replacementStr
    }
    return replacement
  }

  protected dateTimeReplacement(
    context: HtmlRR0Context, previousContext: RR0Context | null,
    options: TimeRenderOptions = {url: true, contentOnly: false}
  ): HTMLElement | undefined {
    let replacement: HTMLElement | undefined = undefined
    if (context.time.isDefined()) {
      replacement = this.renderer.render(context, previousContext, options)
    }
    return replacement
  }
}
