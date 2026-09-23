import { RR0Context } from "../../RR0Context.js"

export class TimeTextBuilder {

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
   */
  build(context: RR0Context, options = this.options): string {
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
      const locale = context.locale
      if (year < 0) {
        date.setFullYear(date.getFullYear() + 1)
        printOptions.era = "narrow"
      }
      text = date.toLocaleString(locale, printOptions)
    }
    return text
  }
}
