import { HtmlRR0Context } from "../../RR0Context.js"
import { DomReplacement } from "../DomReplacement.js"
import { ObjectUtils } from "@rr0/common"
import { TimeElementFactory } from "./TimeElementFactory.js"
import { TimeRenderOptions } from "./TimeRenderer.js"
import { TimeStringCompleter } from "./TimeStringCompleter.js"

/**
 * Replaces a <time> tag.
 */
export class TimeReplacer implements DomReplacement<HtmlRR0Context, HTMLTimeElement> {

  /**
   * Elements that don't break a sentence, so that the text before them is the text before the <time> they contain
   * ("between <strong><time>1989/1994</time></strong>").
   */
  static readonly inlineTags = ["STRONG", "EM", "B", "I", "U", "SPAN", "A"]

  protected readonly completer = new TimeStringCompleter()

  constructor(readonly factory: TimeElementFactory) {
  }

  static resolvedTime(context: HtmlRR0Context, dateTime: string): HTMLTimeElement {
    const replacement = context.file.document.createElement("time") as HTMLTimeElement
    replacement.dateTime = dateTime
    return replacement
  }

  /**
   * @return The text that precedes an element in its sentence.
   */
  static precedingText(el: Element): string {
    let node: Node = el
    while (!node.previousSibling && node.parentElement && TimeReplacer.inlineTags.includes(node.parentElement.tagName)) {
      node = node.parentElement
    }
    return node.previousSibling?.textContent ?? ""
  }

  async replacement(context: HtmlRR0Context, origEl: HTMLTimeElement): Promise<HTMLElement> {
    let replacement: HTMLElement | undefined
    if (origEl.dateTime || origEl.dataset.format === "none") {  // Already done, or not to be interpreted
      replacement = origEl
    } else {
      const previousContext = origEl.dataset.context === "none" ? undefined : context.clone()
      const timeStr = origEl.textContent
      const {prefix, value, suffix} = this.completer.split(timeStr)
      const preceding = TimeReplacer.precedingText(origEl) + prefix
      const between = context.messages.context.time.between.test(preceding)
      // "en l'année suivante" is not French: after a preposition, the time is rendered in full
      const relativeWords = !context.messages.context.time.preposition.test(preceding)
      // A <time> already inside a link keeps that link: a link of its own would nest <a> in <a>, which the HTML
      // parser splits, closing the enclosing elements (a note, a source) early.
      const url = !origEl.closest("a")
      const options = {url, contentOnly: true, between, relativeWords}
      try {
        const durations = /^(~?)P([^/]+)\/P?([^/]+)$/.exec(value.trim())  // "P10M/12M"
        if (durations) {
          replacement = this.durationRange(context, previousContext, durations, options)
        } else {
          const completed = this.completer.complete(value.trim(), context.time)
          if (!this.completer.isInterpretable(completed)) {
            context.warn("Could not interpret time", timeStr)
          } else if (this.completer.isDayless(completed)) {
            context.warn("Could not resolve the day of time", timeStr)
          } else if (context.time.updateFromStr(completed)) {
            replacement = this.factory.create(context, previousContext, options)
          }
        }
      } catch (e) {  // One unrenderable time must not stop the others of the page
        context.warn("Could not render time", timeStr, (e as Error).message)
        replacement = undefined
      }
      if (!replacement) {
        replacement = origEl
      } else if (prefix || suffix) {  // Keep the words written around the time ("vers", "le soir")
        const wrapper = context.file.document.createElement("span")
        wrapper.className = "time-described"
        wrapper.append(prefix, replacement, suffix)
        replacement = wrapper
      }
      context.debug("\tReplacing time", origEl.outerHTML, "with", ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    }
    return replacement
  }

  /**
   * Renders a range of durations ("P10M/12M") as "from 10 to 12 minutes".
   */
  protected durationRange(context: HtmlRR0Context, previousContext: HtmlRR0Context | undefined,
                          durations: RegExpExecArray, options: TimeRenderOptions): HTMLElement | undefined {
    const [, approximate, from, to] = durations
    const fromContext = context.clone()
    const toContext = context.clone()
    let replacement: HTMLElement | undefined
    if (fromContext.time.updateFromStr(`${approximate}P${from.toUpperCase()}`)
      && toContext.time.updateFromStr(`${approximate}P${to.toUpperCase()}`)) {
      replacement = this.factory.createInterval(fromContext, toContext, previousContext, options)
    }
    return replacement
  }
}
