import { TimeRenderer } from "./html/TimeRenderer.js"
import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { TimeUrlBuilder } from "./TimeUrlBuilder"
import { AbstractDataService, AllDataService, RR0Event, RR0EventJson } from "@rr0/data"
import { HtmlRR0Context, RR0ContextImpl } from "../RR0Context"
import { StringUtil } from "../util"
import { TimeContext } from "@rr0/time"

export type TimeServiceOptions = {
  readonly root: string,
  readonly files: string[]
}

export class TimeService extends AbstractDataService<RR0Event, RR0EventJson> {

  static readonly defaultRegex = /time\/(-)?(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

  readonly renderer: TimeRenderer
  readonly root: string

  constructor(dataService: AllDataService, readonly textBuilder: TimeTextBuilder, readonly urlBuilder: TimeUrlBuilder,
              options: TimeServiceOptions, readonly timePathRegex = TimeService.defaultRegex) {
    super(dataService, null, options.files)
    this.root = options.root
    this.renderer = new TimeRenderer(this, this.textBuilder)
  }

  isTimeFile(filePath: string): boolean {
    return this.files.includes(filePath)
  }

  /**
   * @return the found time URL or undefined if not found.
   */
  matchExistingTimeFile(url: string): string | undefined {
    while (url && url !== this.root && this.files.indexOf(`${url}/index.html`) < 0) {
      const slash = url.lastIndexOf("/")
      url = url.substring(0, slash)
    }
    return url === this.root ? undefined : url
  }

  /**
   * Instantiate a Date object matching an ISO date ("1972-08-12 16:34" for instance).
   *
   * Approximated dates like "~1972" will be converted to exact dates ("1972").
   *
   * @param isoDate
   */
  dateFromIso(isoDate: string): Date {
    isoDate = isoDate.replace("~", "")
    if (isoDate.charAt(0) === "-") {
      isoDate = "-" + "0".repeat(7 - isoDate.length) + isoDate.substring(1)
    }
    return new Date(isoDate)
  }

  parseFileName(fileName: string): RegExpExecArray | null {
    return this.timePathRegex.exec(fileName)
  }

  titleFromFile(context: HtmlRR0Context, fileName: string,
                timeTextBuilder: TimeTextBuilder): string | undefined {
    let title: string | undefined
    const timeContext = this.contextFromFileName(context, fileName)
    if (timeContext) {
      const pageContext = new RR0ContextImpl(context.locale, timeContext, context.config, context.people,
        context.file)
      title = timeTextBuilder.build(pageContext)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }

  contextFromFileName(context: HtmlRR0Context, fileName = context.file.name): TimeContext | undefined {
    let timeContext: TimeContext | undefined
    let elems
    if (fileName.endsWith("index.html")) {
      while ((elems = fileName.split("/")).length < 6) {
        fileName = elems.slice(0, elems.length - 1).join("/") + "/0/index.html"
      }
    }
    const timeExec = this.parseFileName(fileName)
    if (timeExec && timeExec.length > 5) {
      const pageContext = context.clone()
      timeContext = pageContext.time
      const m = parseInt(timeExec[2], 10)
      const c = parseInt(timeExec[3], 10)
      const d = parseInt(timeExec[4], 10)
      const u = parseInt(timeExec[5], 10)
      const year = (timeExec[1] ? -1 : 1) * (m * 1000 + c * 100 + d * 10 + u)
      timeContext.setYear(year)
      const monthStr = timeExec[6]
      timeContext.setMonth(monthStr ? parseInt(monthStr, 10) : undefined)
      const dayStr = timeExec[7]
      timeContext.setDayOfMonth(dayStr ? parseInt(dayStr, 10) : undefined)
      timeContext.setHour(undefined)
      timeContext.setMinutes(undefined)
    }
    return timeContext
  }

  gSetTimeFromPath(context: HtmlRR0Context, filePath: string): TimeContext | undefined {
    const time = context.time
    time.reset()
    const newTimeContext = this.contextFromFileName(context, filePath)
    if (newTimeContext) {
      time.setYear(newTimeContext.getYear())
      time.setMonth(newTimeContext.getMonth())
      time.setDayOfMonth(newTimeContext.getDayOfMonth())
      // context.time.from = context.time
    }
    return newTimeContext
  }

  setContextFromFile(context: HtmlRR0Context, filePath: string) {
    this.setTimeFromPath(context, filePath)
  }

  protected setTimeFromPath(context: HtmlRR0Context, filePath: string) {
    context.time.reset()  // Don't use time context from previous page.
    this.gSetTimeFromPath(context, filePath)
  }

}
