import { LinkHandler } from "../MetaLinkReplaceCommand"
import { Time } from "./Time"
import { HtmlRR0SsgContext } from "../RR0SsgContext"
import { Link, LinkType } from "ssg-api"
import { TimeTextBuilder } from "./TimeTextBuilder"

export class TimeLinkDefaultHandler implements LinkHandler<HtmlRR0SsgContext> {

  constructor(protected timeFiles: string[], protected timeTextBuilder: TimeTextBuilder) {
  }

  contents(context: HtmlRR0SsgContext): Link | undefined {
    const prevLink = this.prev(context)
    if (prevLink) {
      let contentUrl = prevLink.url.substring(1)
      do {
        const slash = contentUrl.lastIndexOf("/")
        contentUrl = contentUrl.substring(0, slash)
      } while (this.timeFiles.indexOf(contentUrl) < 0 && contentUrl !== "time")
      if (contentUrl != "time") {
        const text = Time.titleFromFile(context, contentUrl, this.timeTextBuilder)
        if (text) {
          return {type: LinkType.prev, text, url: "/" + contentUrl}
        }
      }
    }
  }

  next(context: HtmlRR0SsgContext): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const pos = this.timeFiles.indexOf(fileName)
      if (pos >= 0) {
        const nextFile = this.timeFiles[pos + 1]
        if (nextFile) {
          const text = Time.titleFromFile(context, nextFile, this.timeTextBuilder)!
          return {type: LinkType.next, text, url: "/" + nextFile}
        }
      }
    }
  }

  prev(context: HtmlRR0SsgContext): Link | undefined {
    let fileName = context.file.name
    if (this.isTimeFile(fileName)) {
      const pos = this.timeFiles.indexOf(fileName)
      if (pos >= 0) {
        const prevFile = this.timeFiles[pos - 1]
        if (prevFile) {
          const text = Time.titleFromFile(context, prevFile, this.timeTextBuilder)
          if (text) {
            return {type: LinkType.prev, text, url: "/" + prevFile}
          }
        }
      }
    }
  }

  start(context: HtmlRR0SsgContext): Link | undefined {
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