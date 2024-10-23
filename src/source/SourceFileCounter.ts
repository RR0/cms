import { PerFileCounter } from "../PerFileCounter.js"
import { HtmlRR0Context } from "../RR0Context.js"

/**
 * Count sources per file.
 */
export class SourceFileCounter extends PerFileCounter<HtmlRR0Context> {

  get value(): string {
    const value = super.value
    return "s" + value
  }
}
