import { ContentVisitor } from "RR0ContentStep.js"
import { HtmlLinks, HtmlMeta } from "ssg-api"
import { HtmlRR0Context } from "RR0Context.js"

export class BookContentVisitor implements ContentVisitor {

  constructor(protected bookMeta: Map<string, HtmlMeta>, protected bookLinks: Map<string, HtmlLinks>) {
  }

  async visit(context: HtmlRR0Context) {
    const bookMeta = this.bookMeta.get(context.file.name)
    Object.assign(context.file.meta, bookMeta)
    const bookLinks = this.bookLinks.get(context.file.name)
    Object.assign(context.file.links, bookLinks)
  }
}
