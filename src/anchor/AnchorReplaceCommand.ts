import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { AnchorReplacer } from "./AnchorReplacer.js"
import { HtmlRR0Context } from "RR0Context.js"
import { AnchorHandler } from "./AnchorHandler.js"

/**
 * Contextual replacement of anchors (`<a>` tags).
 */
export class AnchorReplaceCommand extends DomReplaceCommand<HTMLAnchorElement> {

  protected readonly singleton: AnchorReplacer

  constructor(baseUrl: string, handlers: AnchorHandler[]) {
    super("a", undefined)
    this.singleton = new AnchorReplacer(baseUrl, handlers)
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<DomReplacer<HTMLAnchorElement>> {
    return {
      replace: async (original: HTMLAnchorElement): Promise<HTMLAnchorElement> => {
        return this.singleton.replacement(context, original)
      }
    }
  }
}
