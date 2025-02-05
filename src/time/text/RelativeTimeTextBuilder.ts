import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { RR0Context } from "../../RR0Context.js"
import { Level0Duration } from "@rr0/time"

export class RelativeTimeTextBuilder {

  constructor(protected timeTextBuilder: TimeTextBuilder) {
  }

  build(oldContext: RR0Context, newContext: RR0Context): string {
    let text: string | undefined
    const time = newContext.time
    const previousTime = time.equals(oldContext?.time) ? undefined : oldContext.time
    let options: Intl.DateTimeFormatOptions | undefined
    if (previousTime?.isDefined()) {
      options = {}
      const deltaMs = time.date.compare(previousTime.date as any)
      const delta = Level0Duration.toSpec(deltaMs)
      const deltaContext = oldContext.clone()
      const deltaTime = deltaContext.time

      const year = time.getYear()
      const previousYear = previousTime.getYear()
      const yearDelta = delta.years?.value
      const sameYear = yearDelta === 0
      const noYear = !previousYear
      const shouldSetYear = yearDelta || (noYear) || previousTime.getYear() !== time.getYear()
      if (shouldSetYear) {
        deltaTime.setYear(year)
        options.year = "numeric"
      }

      const month = time.getMonth()
      const previousMonth = previousTime.getMonth()
      const monthDelta = delta.months?.value
      const sameMonth = monthDelta === 0
      const noMonth = !previousMonth
      const shouldSetMonth = monthDelta || (noMonth || shouldSetYear)
      if (shouldSetMonth) {
        deltaTime.setMonth(month)
        options.month = "long"
      }

      const dayOfMonth = time.getDayOfMonth()
      const previousDay = previousTime.getDayOfMonth()
      const dayOfMonthDelta = delta.days?.value
      const shouldSetDay = dayOfMonthDelta || (dayOfMonth && (noMonth || (sameYear && sameMonth)))
      const noDay = !previousDay
      const sameDay = dayOfMonthDelta === 0
      if (shouldSetDay) {
        deltaTime.setDayOfMonth(dayOfMonth)
        options.day = "numeric"
        options.weekday = "long"
      }

      const hour = time.getHour()
      const hourDelta = delta.hours?.value
      const shouldSetHour = hourDelta || (hour && (noDay || (sameYear && sameMonth && sameDay))) || previousTime.getHour() !== time.getHour()
      if (shouldSetHour) {
        deltaTime.setHour(hour)
        options.hour = "2-digit"
      }

      const minutes = time.getMinutes()
      const minutesDelta = delta.minutes?.value
      const sameHour = hourDelta === 0
      const shouldSetMinutes = minutesDelta || (minutes && (sameYear && sameMonth && sameDay && sameHour))
      if (shouldSetMinutes) {
        deltaTime.setMinutes(minutes)
        options.minute = "2-digit"
      }
      if (deltaContext.time.isDefined()) {
        newContext = deltaContext
      }

      const messages = newContext.messages.context.time.relative
      if (dayOfMonthDelta && yearDelta < 1 && monthDelta <= 1) {
        switch (dayOfMonthDelta) {
          case -1:
            text = messages.day.before
            break
          case +1:
            text = messages.day.after
            break
        }
      } else {
        if (!dayOfMonth && yearDelta < 1) {
          switch (monthDelta) {
            case -1:
              text = messages.month.before
              break
            case +1:
              text = messages.month.after
              break
          }
        }
        if (!month) {
          switch (yearDelta) {
            case -1:
              text = messages.year.before
              break
            case +1:
              text = messages.year.after
              break
          }
        }
        if (!minutes) {
          switch (hourDelta) {
            case -1:
              text = messages.hour.before
              break
            case +1:
              text = messages.hour.after
              break
          }
        }
      }
    }
    if (!text) {
      text = this.timeTextBuilder.build(newContext, options)
    }
    return text
  }
}
