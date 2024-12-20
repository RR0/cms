import { LinkHandler } from "../MetaLinkReplaceCommand.js"
import { Time } from "./Time.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { Link, LinkType } from "ssg-api"
import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { TimeService } from "./TimeService"

export class TimeLinkDefaultHandler implements LinkHandler<HtmlRR0Context> {

  constructor(protected service: TimeService, protected timeTextBuilder: TimeTextBuilder) {
  }

  contents(context: HtmlRR0Context): Link | undefined {
    const prevLink = this.prev(context)
    if (prevLink) {
      let contentUrl = this.service.matchExistingTimeFile(prevLink.url.substring(1))
      if (contentUrl != this.service.root) {
        const text = Time.titleFromFile(context, contentUrl, this.timeTextBuilder)
        if (text) {
          return {type: LinkType.prev, text, url: "/" + contentUrl}
        }
      }
    }
  }

  next(context: HtmlRR0Context): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const pos = this.service.files.indexOf(fileName)
      if (pos >= 0) {
        const nextFile = this.service.files[pos + 1]
        if (nextFile) {
          const text = Time.titleFromFile(context, nextFile, this.timeTextBuilder)!
          return {type: LinkType.next, text, url: "/" + nextFile}
        }
      }
    }
  }

  prev(context: HtmlRR0Context): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const pos = this.service.files.indexOf(fileName)
      if (pos >= 0) {
        const prevFile = this.service.files[pos - 1]
        if (prevFile) {
          const text = Time.titleFromFile(context, prevFile, this.timeTextBuilder)
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
