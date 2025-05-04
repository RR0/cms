import { HtmlRR0Context } from "../../RR0Context.js"
import { DomReplacement } from "../DomReplacement.js"
import { ObjectUtils } from "@rr0/common"
import { TimeElementFactory } from "./TimeElementFactory.js"

/**
 * Replaces a <time> tag.
 */
export class TimeReplacer implements DomReplacement<HtmlRR0Context, HTMLTimeElement> {

  constructor(readonly factory: TimeElementFactory) {
  }

  static resolvedTime(context: HtmlRR0Context, dateTime: string): HTMLTimeElement {
    const replacement = context.file.document.createElement("time") as HTMLTimeElement
    replacement.dateTime = dateTime
    return replacement
  }

  async replacement(context: HtmlRR0Context, origEl: HTMLTimeElement): Promise<HTMLElement> {
    let replacement: HTMLElement | undefined
    if (origEl.dateTime) {  // Already done?
      replacement = origEl
    } else {
      const previousContext = origEl.dataset.context === "none" ? undefined : context.clone()
      const timeStr = origEl.textContent
      const valid = context.time.updateFromStr(timeStr)
      replacement = valid && this.factory.create(context, previousContext, {url: true, contentOnly: true})
      if (!replacement) {
        replacement = origEl
        // replacement.setAttribute("datetime", context.time.toString())
      }
      context.debug("\tReplacing time", origEl.outerHTML, "with", ObjectUtils.asSet<HTMLElement>(replacement).outerHTML)
    }
    return replacement
  }
}
