import { LinkHandler } from "../MetaLinkReplaceCommand.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { Link, LinkType } from "ssg-api"
import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { TimeService } from "./TimeService.js"
import { TimeUrlBuilder } from "./TimeUrlBuilder.js"

export class TimeLinkDefaultHandler implements LinkHandler<HtmlRR0Context> {

  constructor(protected service: TimeService, protected urlBuilder: TimeUrlBuilder,
              protected timeTextBuilder: TimeTextBuilder) {
  }

  contents(context: HtmlRR0Context): Link | undefined {
    const prevLink = this.prev(context)
    if (prevLink) {
      const urlBuilder = this.urlBuilder
      let contentUrl = urlBuilder.matchExistingTimeFile(prevLink.url.substring(1))
      if (contentUrl != urlBuilder.options.rootDir) {
        const text = this.service.titleFromFile(context, contentUrl, this.timeTextBuilder)
        if (text) {
          return {type: LinkType.prev, text, url: "/" + contentUrl}
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
          const text = service.titleFromFile(context, nextFile, this.timeTextBuilder)!
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
          const text = service.titleFromFile(context, prevFile, this.timeTextBuilder)
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
        type: LinkType.contents,
        text: "Chronologie",
        url: "/time/"
      }
    }
  }

  protected isTimeFile(fileName: string): boolean {
    return fileName.startsWith("time/")
  }
}
