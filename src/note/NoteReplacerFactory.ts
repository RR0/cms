import { DomReplacer, ReplacerFactory } from "ssg-api"
import { NoteReplacer } from "./NoteReplacer.js"
import { HtmlRR0Context } from "../RR0Context.js"

/**
 * Creates replacers for notes HTML in a given context.
 */
export class NoteReplacerFactory implements ReplacerFactory<DomReplacer> {

  constructor(protected replacer: NoteReplacer) {
  }

  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    const instance = this.replacer
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return instance.replacement(context, original)
      }
    }
  }
}
