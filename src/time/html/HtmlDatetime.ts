import { Level2Date, Level2Duration } from "@rr0/time"

/**
 * The `datetime` attribute of a <time> and the EDTF it comes from.
 *
 * HTML knows its own formats only: a year, month, date, local or global date and time ("2004-06-11T09:12:33.123+01:00"),
 * and durations in days, hours, minutes and seconds ("P1DT2H30M"). EDTF is richer: qualified values ("2004-~06", "~P2H"),
 * a time zone written "+01", years and months in durations. So `datetime` holds what HTML can express, and what it cannot
 * is kept as it was written in `data-edtf`, which is only set when it differs from `datetime`.
 */
export class HtmlDatetime {

  /**
   * Sets the attributes of a <time> element for a time.
   *
   * @param el The element to set the attributes of.
   * @param time The time the element is about.
   */
  static apply(el: HTMLElement, time: Level2Date | Level2Duration): void {
    const datetime = HtmlDatetime.of(time)
    if (datetime !== undefined) {
      (el as HTMLTimeElement).dateTime = datetime
    }
    const edtf = time.toString()
    if (edtf !== datetime) {
      el.dataset.edtf = edtf
    }
  }

  /**
   * @return The `datetime` value that HTML can read for a time, or undefined if HTML has no equivalent.
   */
  static of(time: Level2Date | Level2Duration): string | undefined {
    return time instanceof Level2Duration ? HtmlDatetime.ofDuration(time) : HtmlDatetime.ofDate(time)
  }

  protected static ofDate(date: Level2Date): string | undefined {
    const year = HtmlDatetime.value(date.year, 1)
    if (year === undefined) {
      return undefined
    }
    let str = String(year).padStart(4, "0")
    const month = HtmlDatetime.value(date.month, 1, 12)  // Seasons (21 to 24) are no month
    if (month === undefined) {
      return str
    }
    str += "-" + HtmlDatetime.pad(month)
    const day = HtmlDatetime.value(date.day, 1, 31)
    if (day === undefined) {
      return str
    }
    str += "-" + HtmlDatetime.pad(day)
    const hour = HtmlDatetime.value(date.hour, 0, 23)
    const minute = HtmlDatetime.value(date.minute, 0, 59)
    if (hour === undefined || minute === undefined) {  // HTML has no time without minutes
      return str
    }
    str += "T" + HtmlDatetime.pad(hour) + ":" + HtmlDatetime.pad(minute)
    const second = HtmlDatetime.value(date.second, 0, 59)
    if (second !== undefined) {
      str += ":" + HtmlDatetime.pad(second)
      const millisecond = HtmlDatetime.value((date as Level2Date & { millisecond?: { value: number } }).millisecond, 0, 999)  // @rr0/time 1.1.0
      if (millisecond !== undefined) {
        str += "." + String(millisecond).padStart(3, "0")
      }
    }
    const timeshift = date.timeshift?.value
    if (typeof timeshift === "number" && Number.isInteger(timeshift)) {
      str += HtmlDatetime.offset(timeshift)
    }
    return str
  }

  protected static ofDuration(duration: Level2Duration): string | undefined {
    const spec = duration.toSpec()
    if (spec.years || spec.months) {  // HTML durations have no years nor months, whose length depends on the date
      return undefined
    }
    const numbers = [spec.days, spec.hours, spec.minutes, spec.seconds].map(comp => HtmlDatetime.value(comp, 0))
    const [days, hours, minutes, seconds] = numbers
    const time = (hours ? hours + "H" : "") + (minutes ? minutes + "M" : "") + (seconds ? seconds + "S" : "")
    const str = (days ? days + "D" : "") + (time ? "T" + time : "")
    return str ? "P" + str : undefined
  }

  /**
   * @return The numeric value of a component, if it has one (not a range of values, as for unspecified digits) within bounds.
   */
  protected static value(comp: { value: unknown } | undefined, min: number, max = Number.MAX_SAFE_INTEGER): number | undefined {
    const value = comp?.value
    return typeof value === "number" && Number.isInteger(value) && value >= min && value <= max ? value : undefined
  }

  protected static pad(n: number): string {
    return String(n).padStart(2, "0")
  }

  /**
   * @param minutes The time zone offset, in minutes east of UTC.
   * @return The time zone offset as HTML writes it ("Z", "+01:00").
   */
  protected static offset(minutes: number): string {
    if (minutes === 0) {
      return "Z"
    }
    const abs = Math.abs(minutes)
    return (minutes < 0 ? "-" : "+") + HtmlDatetime.pad(Math.floor(abs / 60)) + ":" + HtmlDatetime.pad(abs % 60)
  }
}
