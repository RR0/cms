import { ContextFilter } from "./ContextFilter"
import { RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"

export interface TimeContextCase {
  time?: TimeContext
}

export class TimeContextFilter<S extends TimeContextCase> extends ContextFilter<S> {

  constructor(context: RR0SsgContext) {
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