import { CodeReplacer } from "./CodeReplacer.js"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0Context } from "../../../../../../RR0Context.js"
import { HtmlCodeParser } from "./HtmlCodeParser.js"

export class CodeReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected readonly replacer = new CodeReplacer([new HtmlCodeParser()])

  /**
   * Creates a contextual replacer for time tags.
   *
   * @param context
   */
  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    return {
      replace: (original: HTMLElement): Promise<HTMLElement> => {
        return this.replacer.replacement(context, original)
      }
    }
  }
}
