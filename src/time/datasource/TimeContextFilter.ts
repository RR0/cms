import { ContextFilter } from "./ContextFilter.js"
import { RR0Context } from "../../RR0Context.js"
import { TimeContext } from "@rr0/time"

export interface TimeContextCase {
  time?: TimeContext
}

export class TimeContextFilter<S extends TimeContextCase> extends ContextFilter<S> {

  constructor(context: RR0Context) {
    super(context)
  }

  filter(c: S): boolean {
    const sightingTime = c.time
    const time = this.context.time
    if (time) {
      const day = time.getDayOfMonth()
      const month = time.getMonth()
      const year = time.getYear()
      return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
    } else {
      return true
    }
  }
}
