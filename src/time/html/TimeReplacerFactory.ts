import { TimeReplacer } from "./TimeReplacer.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { TimeUrlBuilder } from "../TimeUrlBuilder"

export class TimeReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected readonly replacer: TimeReplacer, protected readonly timeUrlBuilder: TimeUrlBuilder) {
  }

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    return {
      replace: (original: HTMLTimeElement): Promise<HTMLElement> => {
        return this.replacer.replacement(
          this.timeUrlBuilder.isTimeFile(context.file.name) ? context.clone() : context, original)
      }
    }
  }
}
