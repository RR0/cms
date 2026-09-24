import { RegexReplacer, SsiEchoVarReplaceCommand, StringContextHandler } from "ssg-api"
import { HtmlRR0Context } from "../RR0Context.js"
import { StringUtil } from "../util/string/StringUtil.js"
import path from "path"

/**
 * Replaces the SSI expression "<!--#echo var="title" -->" by the page's <title> content,
 * with a link if there's a <meta name="url"> content.
 */
export class SsiTitleReplaceCommand extends SsiEchoVarReplaceCommand {

  protected static readonly setVarRegex = /<!--\s*#set\s+var="title"\s+value="(.+?)"\s*-->\s*/s

  /**
   * The title set by the file being processed, if any.
   */
  protected setTitle: string | undefined

  /**
   * @param defaultHandlers Will generate a title for a given context/file, if no title is found.
   */
  constructor(protected defaultHandlers: StringContextHandler[] = []) {
    super("title")
  }

  /**
   * Consumes a `<!--#set var="title" value="..." -->` directive first, as it would otherwise be read only after the
   * title has been resolved (and then output as a second `<title>` inside the page's body).
   */
  async execute(context: HtmlRR0Context): Promise<void> {
    const contents = context.file.contents
    const match = SsiTitleReplaceCommand.setVarRegex.exec(contents)
    this.setTitle = match?.[1]
    if (match) {
      context.file.contents = contents.replace(match[0], "")
    }
    await super.execute(context)
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
    let title = context.file.title || this.setTitle
    if (!title) {
      this.defaultHandlers.some(handle => !title && (title = handle(context)))
    }
    if (!title) {
      title = this.nameTitle(context.file.name)
    }
    return title
  }

  /**
   * @return The title implied by a file name: its directory's name for an index page (org/eu/fr/.../paris/index.html
   * gives "Paris"), its own name otherwise.
   */
  protected nameTitle(fileName: string): string {
    const baseName = path.basename(fileName, path.extname(fileName))
    const name = /^index(_[a-z]{2})?$/.test(baseName) ? path.basename(path.dirname(fileName)) : baseName
    return StringUtil.camelToText(name)
  }
}
