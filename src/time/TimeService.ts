import { TimeTextBuilder } from "./text/TimeTextBuilder.js"
import {
  AbstractDataService,
  AllDataService,
  EventDataFactory,
  RR0Event,
  RR0EventFactory,
  RR0EventJson
} from "@rr0/data"
import { HtmlRR0Context, RR0ContextImpl } from "../RR0Context.js"
import { StringUtil } from "../util/index.js"
import { TimeContext } from "@rr0/time"
import { TimeOptions } from "./TimeOptions.js"

export class TimeService extends AbstractDataService<RR0Event, RR0EventJson> {

  static readonly defaultRegex = /time\/(-)?(\d)\/(\d)\/(\d)\/(\d)\/?(\d{2})?\/?(\d{2})?\/?(index(_[a-z]{2})?.html)?/

  constructor(dataService: AllDataService, protected options: TimeOptions,
              readonly timePathRegex = TimeService.defaultRegex) {
    super(dataService, new EventDataFactory(new RR0EventFactory(),
        ["birth", "death", "image", "book", "article", "sighting", "nationality", "move", "occupation"], options.files),
      options.files)
  }

  parseFileName(fileName: string): RegExpExecArray | null {
    return this.timePathRegex.exec(fileName)
  }

  titleFromFile(context: HtmlRR0Context, fileName: string, timeTextBuilder: TimeTextBuilder): string | undefined {
    let title: string | undefined
    const timeContext = this.contextFromFileName(context, fileName)
    if (timeContext) {
      const pageContext = new RR0ContextImpl(context.locale, timeContext, context.config, context.people, context.file,
        context.messages, context.cms)
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

  setContextFromFile(context: HtmlRR0Context, filePath: string): TimeContext | undefined {
    const time = context.time
    time.reset()
    const newTimeContext = this.contextFromFileName(context, filePath)
    if (newTimeContext) {
      time.setYear(newTimeContext.getYear())
      time.setMonth(newTimeContext.getMonth())
      time.setDayOfMonth(newTimeContext.getDayOfMonth())
      // context.time.from = context.time
    }
    // TODO: Set people + parent context if filePath under people root dir
    // TODO: Set place + parent context if filePath under place root dir
    // TODO: Set place + parent context if filePath under org root dir
    return newTimeContext
  }
}
