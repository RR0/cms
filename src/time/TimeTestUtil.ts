import path from "path"
import { TimeElementFactory, TimeService, TimeServiceOptions, TimeTextBuilder, TimeUrlBuilder } from "../time/index.js"
import { RR0TestUtil, rr0TestUtil } from "../test"
import { HtmlRR0SsgContext } from "../RR0SsgContext"

export class TimeTestUtil {

  readonly timeTextBuilder: TimeTextBuilder
  timeElementFactory: TimeElementFactory
  timeOptions: TimeServiceOptions = {root: "time", files: []}
  urlBuilder = new TimeUrlBuilder({rootDir: this.timeOptions.root})
  protected timeService: TimeService
  fullRoot: string

  constructor(rr0TestUtil: RR0TestUtil) {
    this.timeTextBuilder = new TimeTextBuilder(rr0TestUtil.intlOptions)
    this.fullRoot = path.join(rr0TestUtil.rootDir, this.timeOptions.root)
  }

  newHtmlContext(inputFileName: string, contents?: string): HtmlRR0SsgContext {
    return rr0TestUtil.newHtmlContext(this.filePath(inputFileName), contents)
  }

  filePath(inputFileName: string): string {
    return path.join(this.timeOptions.root, inputFileName)
  }

  url(inputFileName: string): string {
    return path.join("/", this.filePath(inputFileName))
  }

  getService(options: TimeServiceOptions = this.timeOptions): TimeService {
    if (
      !this.timeService
      || this.timeService.root !== options.root
      || JSON.stringify(this.timeService.files) !== JSON.stringify(options.files)
    ) {
      this.timeService = new TimeService(rr0TestUtil.dataService, this.timeTextBuilder, this.urlBuilder, options)
      this.timeElementFactory = new TimeElementFactory(this.timeService.renderer)
    }
    return this.timeService
  }
}
