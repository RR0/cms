import { RR0Messages, ssgMessages } from "./lang/index.js"
import { ConsoleLogger, FileContents, HtmlSsgContext, SsgConfig, SsgContext, SsgContextImpl } from "ssg-api"
import { People } from "./people/People.js"
import { TimeContext } from "@rr0/time"

export interface RR0Context extends SsgContext {

  readonly messages: RR0Messages
  readonly time: TimeContext

  clone(locale?: string): RR0Context
}

export interface HtmlRR0Context extends HtmlSsgContext {
  readonly messages: RR0Messages
  time: TimeContext
  people: People
  readonly images: Set<string>
  readonly config: SsgConfig

  clone(locale?: string): HtmlRR0Context
}

export class RR0ContextImpl extends SsgContextImpl {


  readonly images = new Set<string>()
  protected readonly fileMap = new Map<string, FileContents>()

  constructor(locale: string, readonly time: TimeContext, readonly config: SsgConfig,
              readonly people = undefined, currentFile: FileContents | undefined = undefined,
              readonly messages: RR0Messages = ssgMessages[locale]) {
    super(locale, new Map(), "RR0", new ConsoleLogger("RR0"), currentFile)
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
    return new RR0ContextImpl(locale, this.time.clone(), this.config, this.people?.clone(), this._file)
  }
}
