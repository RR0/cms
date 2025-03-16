import { RegexReplacer, SsiEchoVarReplaceCommand, StringContextHandler } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"

/**
 * Replaces the SSI expression "<!--#echo var="title" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class SsiTitleReplaceCommand extends SsiEchoVarReplaceCommand {
  /**
   * @param defaultHandlers Will generate a title for a given context/file, if no title is found.
   */
  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("title")
  }

  protected async createReplacer(context: HtmlRR0Context): Promise<RegexReplacer> {
    return {
      replace: (_match: string, ..._args: any[]): string => {
        const titleStr = this.getTitle(context)
        context.file.title = titleStr
        const titleUrl = context.file.meta.url
        return titleUrl ? `<a href="${titleUrl}" target="_blank">${titleStr}</a>` : titleStr
      }
    }
  }

  protected getTitle(context: HtmlRR0Context) {
    let title = context.file.title
    if (!title) {
      this.defaultHandlers.some(handle => !title && (title = handle(context)))
    }
    if (!title) {
      title = context.file.name
    }
    return title
  }
}
