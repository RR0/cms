import { HtmlRR0Context } from "../../RR0Context.js"
import { DomReplacement } from "../DomReplacement.js"
import { ObjectUtils } from "@rr0/common"
import { TimeElementFactory } from "./TimeElementFactory.js"

/**
 * Replaces a <time> tag.
 */
export class TimeReplacer implements DomReplacement<HtmlRR0Context, HTMLTimeElement> {

  /**
   * Elements that don't break a sentence, so that the text before them is the text before the <time> they contain
   * ("between <strong><time>1989/1994</time></strong>").
   */
  static readonly inlineTags = ["STRONG", "EM", "B", "I", "U", "SPAN", "A"]

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
      const valid = context.time.updateFromStr(timeStr)
      const between = context.messages.context.time.between.test(TimeReplacer.precedingText(origEl))
      try {
        replacement = valid && this.factory.create(context, previousContext, {url: true, contentOnly: true, between})
      } catch (e) {  // One unrenderable time must not stop the others of the page
        context.warn("Could not render time", timeStr, (e as Error).message)
        replacement = undefined
      }
      if (!replacement) {
        replacement = origEl
        // replacement.setAttribute("datetime", context.time.toString())
      }
      context.debug("\tReplacing time", origEl.outerHTML, "with", ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    }
    return replacement
  }
}
