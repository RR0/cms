import { TimeContext } from "../TimeContext.mjs"

/**
 * A <time> string split into the time value itself and the free text around it ("vers 10:50", "03Tla nuit").
 */
export interface TimeStringParts {
  prefix: string
  value: string
  suffix: string
}

/**
 * Prepares a <time> string for EDTF parsing.
 *
 * RR0 pages write times relative to the page and to the previous time: "19" is the 19th of the current month,
 * "21:00" an hour of the current day, "1517-05-22 21:00/22:00" ends at 22:00 the same day. EDTF alone reads "19"
 * as the year 19 and "07:30" as the year 7, so such partial values are completed from the current time context
 * first. Free text written around the value ("le soir", "vers") is set apart so that it can be kept as is.
 */
export class TimeStringCompleter {

  /**
   * A trailing time zone ("PST", "(CDT)", "UTC+1") is part of the value, not free text.
   */
  protected static readonly timeZone = /^\(?(?:[A-Z]{1,5}|UTC[+-]?\d*)\)?$/

  /**
   * A duration ("P10M", "~P1H"), or a range of durations ("P10M/12M").
   */
  static readonly duration = /^~?P\d/

  split(str: string): TimeStringParts {
    let prefix = ""
    let value = str.replace(/[ \t\r\n]+/g, " ").trim()  // "1973-10-11\n      21:00/22:00"
    let suffix = ""
    if (!TimeStringCompleter.duration.test(value.trim())) {
      const pre = /^([^\d~-]*[A-Za-zÀ-ÿ][^\d~]*?)(\s+)(~?\d.*)$/s.exec(value)  // "vers 10:50", "Environ 00:30"
      if (pre) {
        prefix = pre[1] + pre[2]
        value = pre[3]
      }
    }
    const post = /^(.*?\d)(\s*T\s*|\s+)([^\d\s~].*)$/s.exec(value)  // "03Tla nuit", "1976-08-03 le soir"
    // A bare number followed by a space may be a quantity ("1 h", "30 mn après", "8 jours plus tard"), so a day of the
    // month needs a T before its text ("18Tla nuit").
    const quantity = post && /^\d{1,2}$/.test(post[1]) && !post[2].includes("T")
    if (post && !quantity && !TimeStringCompleter.timeZone.test(post[3].trim())) {
      value = post[1]
      suffix = (post[2].includes("T") ? " " : post[2]) + post[3]
    }
    return {prefix, value, suffix}
  }

  /**
   * @param value A time value, possibly partial ("19", "21:00", "15 22:00/16 05:00").
   * @param time The current time context, that the partial value is relative to.
   * @return The completed value, or the value unchanged if it is not partial or cannot be completed.
   */
  complete(value: string, time: TimeContext): string {
    const slash = value.indexOf("/")
    if (slash > 0 && !TimeStringCompleter.duration.test(value)) {
      const start = this.completeOne(value.substring(0, slash).trim(), time)
      const startTime = new TimeContext()
      if (!startTime.updateFromStr(start) || !startTime.date) {
        return value
      }
      let end = value.substring(slash + 1).trim()
      const endMonth = /^\d{1,2}$/.exec(end)
      if (endMonth && !startTime.getDayOfMonth() && startTime.getMonth()) {  // "1989-05/06": May to June
        end = `${this.year(startTime.getYear())}-${this.pad(end)}`
      } else {
        const completedEnd = this.completeOne(end, startTime)
        end = completedEnd !== end && this.isTime(end) ? this.dayAfterIfBefore(completedEnd, start) : completedEnd
      }
      return start + "/" + end
    }
    return this.completeOne(value, time)
  }

  /**
   * EDTF parsing reads "1 h après le coucher" as the year 1 and ignores the rest: words must not reach it.
   *
   * @return If the value only holds characters of a time value (and possibly a trailing time zone).
   */
  isInterpretable(value: string): boolean {
    const withoutZone = value.replace(/\s*\(?(?:[A-Z]{2,5}|UTC[+-]?\d*)\)?\s*(\/|$)/g, "$1")  // "01:00EST/03:00EST"
    return /^[\d\s\-:/~?%.,+XTZPYMWDHS]+$/.test(withoutZone)
  }

  /**
   * @return If the value still holds a time of an unknown day ("07:30", "12 05:45"), which EDTF would read as a year.
   */
  isDayless(value: string): boolean {
    return value.split("/").some(part => /^~?\d{1,2}[: T]\d/.test(part.trim()))
  }

  protected completeOne(value: string, time: TimeContext): string {
    const year = time.getYear()
    const month = time.getMonth()
    const day = time.getDayOfMonth()
    const knownMonth = year !== undefined && month >= 1 && month <= 12
    let m: RegExpExecArray | null
    if ((m = /^(\d{1,2})$/.exec(value)) && knownMonth && Number(m[1]) <= 31) {  // "19": a day of the month
      return `${this.year(year)}-${this.pad(month)}-${this.pad(m[1])}`
    }
    if ((m = /^(\d{1,2})[ T](~?\d{1,2}:\d{2}(?::\d{2})?.*)$/.exec(value)) && knownMonth && Number(m[1]) <= 31) {
      return `${this.year(year)}-${this.pad(month)}-${this.pad(m[1])} ${m[2]}`  // "12 05:45", "23T~01:45"
    }
    if ((m = /^(\d{2})-(\d{2})( .+)?$/.exec(value)) && year !== undefined && Number(m[1]) <= 12) {  // "02-11 02:00"
      return `${this.year(year)}-${m[1]}-${m[2]}${m[3] ?? ""}`
    }
    if ((m = /^(~?\d{1,2}:\d{2}(?::\d{2})?)(.*)$/.exec(value)) && knownMonth && day) {  // "21:00"
      return `${this.year(year)}-${this.pad(month)}-${this.pad(day)} ${m[1]}${m[2]}`
    }
    return value
  }

  protected isTime(value: string): boolean {
    return /^~?\d{1,2}:\d{2}/.test(value)
  }

  /**
   * An end hour before its start hour ("23:00/03:00") is on the next day.
   *
   * @param end The end, completed with the day of its start ("1981-10-27 03:00").
   * @param start The start ("1981-10-27 23:00").
   */
  protected dayAfterIfBefore(end: string, start: string): string {
    const time = /^(-?\d{4})-(\d{2})-(\d{2}) (~?)(\d{1,2}:\d{2})(.*)$/.exec(end)
    const startTime = /^-?\d{4}-\d{2}-\d{2}[ T]~?(\d{1,2}:\d{2})/.exec(start)
    if (time && startTime && time[5].padStart(5, "0") < startTime[1].padStart(5, "0")) {
      const next = new Date(Date.UTC(Number(time[1]), Number(time[2]) - 1, Number(time[3]) + 1))
      next.setUTCFullYear(Number(time[1]), Number(time[2]) - 1, Number(time[3]) + 1)  // Years before 100 too
      const day = `${this.year(next.getUTCFullYear())}-${this.pad(next.getUTCMonth() + 1)}-${this.pad(next.getUTCDate())}`
      end = `${day} ${time[4]}${time[5]}${time[6]}`
    }
    return end
  }

  protected year(year: number): string {
    return (year < 0 ? "-" : "") + String(Math.abs(year)).padStart(4, "0")
  }

  protected pad(n: number | string): string {
    return String(n).padStart(2, "0")
  }
}
