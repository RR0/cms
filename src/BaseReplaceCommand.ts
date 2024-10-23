import { DomReplaceCommand, DomReplacer } from "ssg-api"
import { HtmlRR0Context } from "./RR0Context.js"

import path from "path"

/**
 * Enforce a constant host value for the <base> tag
 */
export class BaseReplaceCommand extends DomReplaceCommand {

  constructor(protected baseUrl: string) {
    super("base", undefined)
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<DomReplacer> {
    const self = this
    return new class implements DomReplacer<HTMLBaseElement> {
      async replace(original: HTMLBaseElement): Promise<HTMLBaseElement> {
        const dir = path.dirname(context.file.name)
        original.href = path.join(self.baseUrl, dir, "/")
        return original
      }
    }
  }
}
