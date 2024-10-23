import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import { TimeContext } from "@rr0/time"
import { HtmlRR0Context, RR0ContextImpl } from "../RR0Context.js"
import { StringUtil } from "../util/string/StringUtil.js"

export class Time {

  static readonly timePathRegex = /time\/(-)?(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

  /**
   * Instantiate a Date object matching an ISO date ("1972-08-12 16:34" for instance).
   *
   * Approximated dates like "~1972" will be converted to exact dates ("1972").
   *
   * @param isoDate
   */
  static dateFromIso(isoDate: string): Date {
    isoDate = isoDate.replace("~", "")
    if (isoDate.charAt(0) === "-") {
      isoDate = "-" + "0".repeat(7 - isoDate.length) + isoDate.substring(1)
    }
    return new Date(isoDate)
  }

  static parseFileName(fileName: string): RegExpExecArray | null {
    return Time.timePathRegex.exec(fileName)
  }

  static titleFromFile(context: HtmlRR0Context, fileName: string,
                       timeTextBuilder: TimeTextBuilder): string | undefined {
    let title: string | undefined
    const timeContext = Time.contextFromFileName(context, fileName)
    if (timeContext) {
      const pageContext = new RR0ContextImpl(context.locale, timeContext, context.config, context.people,
        context.file)
      title = timeTextBuilder.build(pageContext, true)
      title = StringUtil.capitalizeFirstLetter(title)
    }
    return title
  }

  static contextFromFileName(context: HtmlRR0Context, fileName = context.file.name): TimeContext | undefined {
    let timeContext: TimeContext | undefined
    let elems
    if (fileName.endsWith("index.html")) {
      while ((elems = fileName.split("/")).length < 6) {
        fileName = elems.slice(0, elems.length - 1).join("/") + "/0/index.html"
      }
    }
    const timeExec = Time.parseFileName(fileName)
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
}
