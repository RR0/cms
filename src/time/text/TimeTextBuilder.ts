import { RR0Context } from "../../RR0Context.js"
import { Level2Date } from "@rr0/time"

/**
 * What a text must tell of the approximation of a time.
 */
export interface TimeApproximation {
  /**
   * The approximate components of the time ("year", "month", "day", "hour", "minute", "second").
   */
  components: ReadonlySet<string>
  /**
   * If the text already tells that the time is approximate, right before it ("vers"), so that no word should tell it again.
   */
  said?: boolean
  /**
   * If the approximation can be told before the time. It cannot after a preposition ("le vers jeudi 12").
   */
  leading?: boolean
}

export class TimeTextBuilder {

  /**
   * The names of the date components, from the coarsest to the finest.
   */
  static readonly componentNames = ["year", "month", "day", "hour", "minute", "second"]

  static readonly dateOptions: (keyof Intl.DateTimeFormatOptions)[] = ["era", "year", "month", "day", "weekday"]

  static readonly timeOptions: (keyof Intl.DateTimeFormatOptions)[] = ["hour", "minute", "second", "timeZoneName"]

  /**
   * A time that tells nothing approximate.
   */
  static readonly exact: TimeApproximation = {components: new Set()}

  /**
   * Reads the approximate components of a date, as EDTF scopes them: a qualification written after a component ("19:00~")
   * applies to it and to all the components before it, one written before a component ("~19:00") to that component only
   * (the components before it are also told approximate at their group level, but only as deduced from it).
   *
   * @param date The date to read the approximation of.
   * @return The names of its approximate components.
   */
  static approximateComponents(date: Level2Date | undefined): Set<string> {
    const components = new Set<string>()
    if (date) {
      const names = TimeTextBuilder.componentNames.filter(name => date[name])
      const comp = (name: string) => date[name] as { approximate?: boolean, approximateComponent?: boolean, approximateGroup?: boolean }
      let lastGroup = -1
      names.forEach((name, i) => {
        const c = comp(name)
        if (c.approximateGroup && !c.approximateComponent && !names.slice(i + 1).some(next => comp(next).approximate)) {
          lastGroup = i
        }
      })
      names.forEach((name, i) => {
        if (comp(name).approximateComponent || i <= lastGroup) {
          components.add(name)
        }
      })
    }
    return components
  }

  /**
   * @return If a text must tell an approximation.
   */
  static tells(approximation: TimeApproximation): boolean {
    return !approximation.said && approximation.components.size > 0
  }

  /**
   * @param context The context whose time to tell the approximation of.
   * @param said If the text already tells that the time is approximate.
   * @param leading If the approximation can be told before the time.
   */
  static approximation(context: RR0Context, said = false, leading = true): TimeApproximation {
    return {components: TimeTextBuilder.approximateComponents(context.time.date), said, leading}
  }

  /**
   * EDTF season codes (21-24) and their names, per language.
   */
  static readonly seasons: Record<string, Record<number, string>> = {
    fr: {21: "printemps", 22: "été", 23: "automne", 24: "hiver"},
    en: {21: "spring", 22: "summer", 23: "autumn", 24: "winter"}
  }

  static isSeason(month: number | undefined): boolean {
    return month >= 21 && month <= 24
  }
  /**
   * @param options The default date format.to use.
   */
  constructor(readonly options: Intl.DateTimeFormatOptions) {
  }

  /**
   * Build a textual representation of context's time, according to context's locale.
   *
   * @param context The context whose time to render.
   * @param options The date format to use.
   * @param approximation The approximation of the time to tell. None by default.
   */
  build(context: RR0Context, options = this.options, approximation = TimeTextBuilder.exact): string {
    const time = context.time
    const printOptions: Intl.DateTimeFormatOptions = {}
    const date = new Date(undefined, undefined, undefined)
    const year = time.getYear()
    const season = time.getMonth()
    if (TimeTextBuilder.isSeason(season)) {  // "1954-23": no Date can hold it
      const names = TimeTextBuilder.seasons[context.locale] ?? TimeTextBuilder.seasons.en
      return year ? `${names[season]} ${year}` : names[season]
    }
    if (year) {
      date.setFullYear(year)
      printOptions.year = options.year
    }
    const month = time.getMonth()
    if (month) {
      date.setDate(1) // Avoid increasing month if today is > 30
      date.setMonth(month - 1)
      printOptions.month = options.month
    }
    const dayOfMonth = time.getDayOfMonth()
    if (dayOfMonth) {
      date.setDate(dayOfMonth)
      printOptions.day = options.day
      printOptions.weekday = options.weekday
    }
    const hour = time.getHour()
    // Hour 0 counts only with minutes (00:38): a bare 0 is also what a date without time (from a Date) carries
    const hasHour = Boolean(hour) || (hour === 0 && Boolean(time.getMinutes()))
    if (hasHour) {
      date.setHours(hour)
      printOptions.hour = options.hour
    }
    const minutes = time.getMinutes()
    if (minutes) {
      date.setMinutes(minutes)
      printOptions.minute = options.minute
    }
    const timeZone = time.getTimeZone()
    if (timeZone) {
      // printOptions.timeZoneName = context.time.options.timeZoneName
    }
    if (!Object.values(printOptions).some(value => value !== undefined)) {
      if (year) {
        printOptions.year = this.options.year
      }
      if (month) {
        printOptions.month = this.options.month
      }
      if (dayOfMonth) {
        printOptions.day = this.options.day
        printOptions.weekday = this.options.weekday
      }
      if (hasHour) {
        printOptions.hour = this.options.hour
      }
      if (minutes) {
        printOptions.minute = this.options.minute
      }
    }
    let text: string
    if (Number.isNaN(date.getTime())) {
      text = ""
      // TODO: Handle partial date (month only, etc.)
    } else {  // Valid date?
      if (year < 0) {
        date.setFullYear(date.getFullYear() + 1)
        printOptions.era = "narrow"
      }
      text = this.dateTimeText(context, date, printOptions, approximation)
    }
    return text
  }

  /**
   * Renders the date and the time of day apart, as Intl joins them only when the date is complete ("jeudi 12 19 h"),
   * and tells their approximation.
   */
  protected dateTimeText(context: RR0Context, date: Date, printOptions: Intl.DateTimeFormatOptions,
                         approximation: TimeApproximation): string {
    const locale = context.locale
    const pick = (keys: (keyof Intl.DateTimeFormatOptions)[]) => Object.fromEntries(
      keys.filter(key => printOptions[key] !== undefined).map(key => [key, printOptions[key]])) as Intl.DateTimeFormatOptions
    const dateOptions = pick(TimeTextBuilder.dateOptions)
    const timeOptions = pick(TimeTextBuilder.timeOptions)
    const hasDate = Object.keys(dateOptions).some(key => key !== "era")
    const hasTime = Object.keys(timeOptions).some(key => key !== "timeZoneName")
    const components = approximation.said ? new Set<string>() : approximation.components
    const printed = (keys: string[]) => keys.some(key => printOptions[key] !== undefined && components.has(key))
    const dateApproximate = printed(["year", "month", "day"])
    const timeApproximate = printed(["hour", "minute", "second"])
    const messages = context.messages.context.time
    let text: string
    if (hasDate && hasTime) {
      const dateText = date.toLocaleString(locale, dateOptions)
      const timeText = date.toLocaleTimeString(locale, timeOptions)
      text = messages.dateTime(dateText, timeText, timeApproximate && !dateApproximate)
    } else {
      text = date.toLocaleString(locale, printOptions)
    }
    const leadingApproximate = hasDate ? dateApproximate : timeApproximate
    if (leadingApproximate && approximation.leading !== false) {
      const prefix = printOptions.day !== undefined ? messages.on(true) : messages.in(true)
      text = prefix + text
    }
    return text
  }
}
