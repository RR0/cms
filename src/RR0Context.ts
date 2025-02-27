import { RR0Messages, ssgMessages } from "./lang/index.js"
import { ConsoleLogger, FileWriteConfig, HtmlSsgContext, SsgContext, SsgContextImpl } from "ssg-api"
import { TimeContext } from "@rr0/time"
import { FileContents } from "@javarome/fileutil"
import { PlaceContext } from "@rr0/place"
import { People } from "@rr0/data"
import { CMSContext } from "./CMSContext"

export interface RR0Context extends SsgContext {

  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(locale?: string): RR0Context
}

export interface HtmlRR0Context extends HtmlSsgContext {
  readonly messages: RR0Messages
  time: TimeContext
  place: PlaceContext
  people: People
  readonly images: Set<string>
  readonly config: FileWriteConfig
  readonly cms: CMSContext

  clone(locale?: string): HtmlRR0Context
}

export class RR0ContextImpl extends SsgContextImpl {

  readonly images = new Set<string>()
  protected readonly fileMap = new Map<string, FileContents>()
  place: PlaceContext

  constructor(locale: string, readonly time: TimeContext, readonly config: FileWriteConfig,
              readonly people = undefined, currentFile: FileContents | undefined = undefined,
              readonly messages: RR0Messages = ssgMessages[locale], readonly cms: CMSContext = undefined) {
    super(locale, new Map(), "RR0", new ConsoleLogger("RR0"), currentFile)
    while (!this.messages) {
      if (locale.length > 2) {
        locale = locale.substring(0, 2)   // Fallback to language without country specifics
      } else {
        locale = "fr" // Default language
      }
      this.messages = ssgMessages[locale]
    }
    this.place = new PlaceContext(locale, this.messages.context.place)
  }

  read(filePath: string): FileContents {
    let file = this.fileMap.get(filePath)
    if (file) {
      this.logger.debug("Reusing output file for", filePath)
      this.file = file
    } else {
      file = super.read(filePath)
      this.fileMap.set(filePath, file)
    }
    return file
  }

  clone(locale = this.locale): RR0ContextImpl {
    return new RR0ContextImpl(locale, this.time.clone(), this.config, this.people?.clone(), this._file, this.messages,
      this.cms)
  }

  toString() {
    return this.time?.toString() || ""
  }
}
