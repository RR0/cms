import { TimeReplacer } from "./TimeReplacer.js"
import { HtmlRR0Context } from "../../RR0Context.js"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { TimeUrlBuilder } from "../TimeUrlBuilder.js"

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
        const isTimeFile = this.timeUrlBuilder.isTimeFile(context.file.name)
        const replacementContext = isTimeFile ? context.clone() : context
        return this.replacer.replacement(replacementContext, original)
      }
    }
  }
}
