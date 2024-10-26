import { TimeTextBuilder } from "./TimeTextBuilder.js"
import { RR0Context } from "../../RR0Context.js"

export class RelativeTimeTextBuilder {

  constructor(protected timeTextBuilder: TimeTextBuilder) {
  }

  build(oldContext: RR0Context, newContext: RR0Context): string {
    let text: string | undefined
    let print = true
    const time = newContext.time
    const previousTime = oldContext?.time
    if (previousTime?.isDefined()) {
      const deltaContext = oldContext.clone()
      const deltaTime = deltaContext.time
      let dayOfMonthDelta: number | undefined
      let hourDelta: number | undefined
      let minutesDelta: number | undefined

      let yearDelta: number | undefined
      const year = time.getYear()
      const sameYear = yearDelta === 0
      const noYear = !previousTime.getYear()
      const shouldSetYear = noYear || !sameYear
      if (year) {
        const previousYear = previousTime.getYear()
        if (previousYear) {
          yearDelta = year - previousYear
          if (yearDelta != 0) {
            deltaTime.setYear(year)
          }
        }
      }

      let monthDelta: number | undefined
      const sameMonth = monthDelta === 0
      const noMonth = !previousTime.getMonth()
      const month = time.getMonth()
      if (month) {
        const previousMonth = previousTime.getMonth()
        if (yearDelta === 0) {
          monthDelta = month - (previousMonth || 0)
          if (monthDelta != 0) {
            deltaTime.setMonth(month)
          }
        } else if (yearDelta != 0) {
          deltaTime.setMonth(month)
        }
      }

      const shouldSetDay = noMonth || (sameYear && sameMonth)
      const noDay = !previousTime.getDayOfMonth()
      const sameDay = dayOfMonthDelta === 0

      const shouldSetHour = noDay || (sameYear && sameMonth && sameDay)

      const noMinutes = !previousTime.getMinutes()
      const sameHour = hourDelta === 0
      const shouldSetMinutes = noMinutes || (sameYear && sameMonth && sameDay && sameHour)

      function setDayOfMonth(dayOfMonth: number) {
        const sameMonth = yearDelta === 0 && shouldSetDay
        if (sameMonth) {
          dayOfMonthDelta = dayOfMonth - (previousTime.getDayOfMonth() || 0)
          if (dayOfMonthDelta != 0) {
            deltaTime.setDayOfMonth(dayOfMonth)
          }
        } else if (monthDelta != 0) {
          deltaTime.setDayOfMonth(dayOfMonth)
        }
      }

      function setHour(hour: number) {
        const sameDay = yearDelta === 0 && shouldSetDay && shouldSetHour
        if (sameDay) {
          hourDelta = hour - (previousTime.getHour() || 0)
          if (hourDelta != 0) {
            deltaTime.setHour(hour)
          }
        } else if (dayOfMonthDelta != 0) {
          deltaTime.setHour(hour)
        }
      }

      function setMinutes(minutes: number) {
        const sameHour = yearDelta === 0 && shouldSetDay && shouldSetHour && shouldSetMinutes
        if (sameHour) {
          minutesDelta = minutes - (previousTime.getMinutes() || 0)
          if (minutesDelta != 0) {
            deltaTime.setMinutes(minutes)
          }
        }
        deltaTime.setMinutes(minutes)
      }

      const dayOfMonth = time.getDayOfMonth()
      if (dayOfMonth) {
        setDayOfMonth(dayOfMonth)
      }
      const hour = time.getHour()
      if (hour) {
        setHour(hour)
      }
      const minutes = time.getMinutes()
      if (minutes) {
        setMinutes(minutes)
      }
      let messages = newContext.messages.context.time.relative
      if (dayOfMonthDelta) {
        switch (dayOfMonthDelta) {
          case -1:
            text = messages.day.before
            break
          case +1:
            text = messages.day.after
            break
        }
      } else {
        if (!dayOfMonth) {
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
      if (!text) {
        let defaultContext: RR0Context
        if (deltaContext.time.isDefined()) {
          defaultContext = deltaContext
          const dayOfMonth = defaultContext.time.getDayOfMonth()
          if (dayOfMonth && shouldSetDay) {
            defaultContext.time.setMonth(newContext.time.getMonth() || previousTime.getMonth(), false)  // give month
            defaultContext.time.setYear(newContext.time.getYear() || previousTime.getYear(), false)  // give year
            // context for the day but won't
            print = false
          }
          newContext = defaultContext
        }
      }
    }
    if (!text) {
      text = this.timeTextBuilder.build(newContext, print)
    }
    return text
  }
}
