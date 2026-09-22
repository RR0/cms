import { LinkHandler } from "../MetaLinkReplaceCommand.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { Link, LinkType } from "ssg-api"
import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { TimeService } from "./TimeService.js"
import { TimeUrlBuilder } from "./TimeUrlBuilder.js"
import { existsSync, readFileSync } from "fs"

export class TimeLinkDefaultHandler implements LinkHandler<HtmlRR0Context> {

  constructor(protected service: TimeService, protected urlBuilder: TimeUrlBuilder,
              protected timeTextBuilder: TimeTextBuilder) {
  }

  /**
   * The period containing the page (the year of a month, the month of a day...), which lists it.
   */
  contents(context: HtmlRR0Context): Link | undefined {
    const fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const pageDir = fileName.substring(0, fileName.lastIndexOf("/"))
      const parentDir = pageDir.substring(0, pageDir.lastIndexOf("/"))
      const contentUrl = this.urlBuilder.matchExistingTimeFile(parentDir)
      if (contentUrl) {
        const contentFile = contentUrl + "/index.html"
        const text = this.titleOf(context, contentFile)
        if (text) {
          return {type: LinkType.contents, text, url: "/" + contentFile}
        }
      }
    }
  }

  next(context: HtmlRR0Context): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const service = this.service
      const pos = service.files.indexOf(fileName)
      if (pos >= 0) {
        const nextFile = service.files[pos + 1]
        if (nextFile) {
          const text = this.titleOf(context, nextFile)!
          return {type: LinkType.next, text, url: "/" + nextFile}
        }
      }
    }
  }

  prev(context: HtmlRR0Context): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const service = this.service
      const pos = service.files.indexOf(fileName)
      if (pos >= 0) {
        const prevFile = service.files[pos - 1]
        if (prevFile) {
          const text = this.titleOf(context, prevFile)
          if (text) {
            return {type: LinkType.prev, text, url: "/" + prevFile}
          }
        }
      }
    }
  }

  start(context: HtmlRR0Context): Link | undefined {
    if (this.isTimeFile(context.file.name)) {
      return {
        type: LinkType.start,
        text: "Chronologie",
        url: "/time/"
      }
    }
  }

  /**
   * A decade, century or millennium cannot be told from a year by its path's date, so its page's own title is used.
   */
  protected titleOf(context: HtmlRR0Context, fileName: string): string | undefined {
    const rootDir = this.urlBuilder.options.rootDir
    const digits = fileName.substring(rootDir.length + 1).split("/").length - 1
    if (digits < 4 && existsSync(fileName)) {
      const title = /<title>([^<]*)<\/title>/.exec(readFileSync(fileName, "utf-8"))?.[1].trim()
      if (title) {
        return title
      }
    }
    return this.service.titleFromFile(context, fileName, this.timeTextBuilder)
  }

  protected isTimeFile(fileName: string): boolean {
    return fileName.startsWith(this.urlBuilder.options.rootDir + "/")
  }
}
