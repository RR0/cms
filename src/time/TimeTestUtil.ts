import path from "path"
import { TimeElementFactory, TimeRenderer, TimeService, TimeTextBuilder, TimeUrlBuilder } from "../time/index.js"
import { CMSTestUtil, cmsTestUtil } from "../test/index.js"
import { HtmlRR0Context } from "../RR0Context.js"
import { TimeOptions } from "./TimeOptions.js"

export class TimeTestUtil {

  readonly timeTextBuilder: TimeTextBuilder
  timeElementFactory: TimeElementFactory
  timeOptions: TimeOptions = {rootDir: "time", files: []}
  urlBuilder: TimeUrlBuilder
  protected timeService: TimeService
  readonly fullRoot: string
  readonly timeRenderer: TimeRenderer

  constructor(cmsTestUtil: CMSTestUtil) {
    this.urlBuilder = new TimeUrlBuilder(this.timeOptions)
    Object.assign(this.urlBuilder,
      {...this.urlBuilder.options, rootDir: cmsTestUtil.filePath(this.timeOptions.rootDir)})
    console.log(this.urlBuilder.options)
    this.timeTextBuilder = new TimeTextBuilder(cmsTestUtil.intlOptions)
    this.fullRoot = path.join(cmsTestUtil.rootDir, this.timeOptions.rootDir)
    this.timeRenderer = new TimeRenderer(this.urlBuilder, this.timeTextBuilder)
  }

  newHtmlContext(inputFileName: string, contents?: string, locale = "fr"): HtmlRR0Context {
    return cmsTestUtil.newHtmlContext(this.filePath(inputFileName), contents, locale)
  }

  filePath(inputFileName: string): string {
    return path.join(this.timeOptions.rootDir, inputFileName)
  }

  url(inputFileName: string): string {
    return path.join("/", this.filePath(inputFileName))
  }

  getService(options: TimeOptions = this.timeOptions): TimeService {
    if (
      !this.timeService
      || this.timeOptions.rootDir !== options.rootDir
      || JSON.stringify(this.timeService.files) !== JSON.stringify(options.files)
    ) {
      this.timeOptions = options
      Object.assign(this.urlBuilder.options, options)
      this.timeService = new TimeService(cmsTestUtil.dataService, options)
      this.timeElementFactory = new TimeElementFactory(this.timeRenderer)
    }
    return this.timeService
  }
}
