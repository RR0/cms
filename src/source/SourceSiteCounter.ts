import { HtmlSsgContext } from "ssg-api"
import { ReferenceGenerator } from "../ReferenceGenerator.js"

/**
 * Count sources in the whole website.
 */
export class SourceSiteCounter<C extends HtmlSsgContext> implements ReferenceGenerator<C> {
  /**
   * Source counter in the scope of the current page/context.
   */
  protected number = 1

  get value(): string {
    return "s" + this.number
  }

  next(_context: C): string {
    this.number++
    return this.value
  }
}
