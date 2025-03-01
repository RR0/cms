import { PeopleReplacer } from "./PeopleReplacer.js"
import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"
import { PeopleHtmlRenderer } from "./PeopleHtmlRenderer.js"
import { PeopleService } from "@rr0/data"

/**
 * Creates replacers for people HTML in a given context.
 */
export class PeopleReplacerFactory implements ReplacerFactory<DomReplacer> {

  protected singleton?: PeopleReplacer

  constructor(protected service: PeopleService, protected renderer: PeopleHtmlRenderer) {
  }

  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    const instance = await this.getInstance()
    return {
      replace:
        (original: HTMLElement): Promise<HTMLElement> => {
          return instance.replacement(context, original)
        }
    }
  }

  protected async getInstance(): Promise<PeopleReplacer> {
    if (!this.singleton) {
      this.singleton = new PeopleReplacer(this.service, this.renderer)
    }
    return this.singleton
  }
}
