import { DomReplacer, ReplacerFactory } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"
import { EventRenderer } from "./EventRenderer.js"
import { AllDataService, RR0Event } from "@rr0/data"

export class EventReplacer<D extends RR0Event> {

  constructor(protected renderer: EventRenderer<D>, protected dataService: AllDataService) {
  }

  async replacement(context: HtmlRR0Context, original: HTMLElement): Promise<HTMLElement> {
    const outputDoc = context.file.document
    const replacement = outputDoc.createElement("span")
    const href = (original as HTMLAnchorElement).href || original.dataset.href
    await this.sourceFromFile(context, replacement, href)
    return replacement
  }

  protected async sourceFromFile(context: HtmlRR0Context, container: HTMLElement, href: string) {
    const data = await this.dataService.getFromDir<D>(href, ["event"], ["index.json"])
    if (data.length <= 0) {
      throw new Error("Could not find metadata in " + href)
    }
    await this.renderer.render(context, data[0], container)
  }
}

/**
 * Creates replacers for sources HTML in a given context.
 */
export class EventReplacerFactory<D extends RR0Event> implements ReplacerFactory<DomReplacer> {

  constructor(protected replacer: EventReplacer<D>) {
  }

  async create(context: HtmlRR0Context): Promise<DomReplacer> {
    const replacer = this.replacer
    return {
      async replace(original: HTMLElement): Promise<HTMLElement> {
        return replacer.replacement(context, original)
      }
    }
  }
}
