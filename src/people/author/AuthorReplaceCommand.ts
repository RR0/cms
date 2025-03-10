import { RegexReplacer, SsiEchoVarReplaceCommand } from "ssg-api"
import { HtmlRR0Context } from "../../RR0Context.js"
import { TimeRenderer } from "../../time/index.js"

/**
 * Replaces "<!--#echo var="author" -->" and "<!--#echo var="copyright" -->"
 * by the page's <meta name="author">s' content.
 */
export class AuthorReplaceCommand extends SsiEchoVarReplaceCommand {

  constructor(protected timeRenderer: TimeRenderer) {
    super("author")
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const file = context.file
        let authors = file.meta.author
        let authorsHtml = authors.map(author => `<span class="people">${author}</span>`).join(" & ")
        const copyright = file.meta.copyright
        if (copyright) {
          authorsHtml += authorsHtml ? ": " + copyright : copyright
        }
        if (authorsHtml && context.time.getYear()) {
          const {result, replacement} = this.timeRenderer.renderContent(context, undefined,
            {url: true, contentOnly: false})
          result.append(replacement)
          authorsHtml += ", " + result.outerHTML
        }
        if (authorsHtml) {
          authorsHtml = `<div class="document-author">${authorsHtml}</div>`
        }
        return authorsHtml
      }
    }
  }
}
