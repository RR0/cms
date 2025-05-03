import { MessageUtils, RR0TimeMessages } from "../lang/index.js"

export class RR0TimeMessages_en implements RR0TimeMessages {
  duration = {
    days: (d: number): string => MessageUtils.plural(d, "day"),
    hours: (d: number): string => MessageUtils.plural(d, "hour"),
    minutes: (mn: number): string => MessageUtils.plural(mn, "minute"),
    seconds: (s: number): string => MessageUtils.plural(s, "second"),
    lastSeparator: " and ",
    approximate: (txt: string): string => `${txt} approximately`
  }
  relative = {
    year: {
      before: "the year before",
      after: "the year after"
    },
    month: {
      before: "le month before",
      after: "the month after",
      later: "a month later"
    },
    day: {
      before: "the day before",
      after: "the day after"
    },
    hour: {
      before: "one hour before",
      after: "one hour later"
    }
  }
  on = (approximate: boolean): string => {
    return (approximate ? "around " : "on")
  }
  in = (approximate: boolean): string => (approximate ? "around " : "")
  fromTo = (startReplacement: string, endReplacement: string): string => startReplacement + " to " + endReplacement
  starting = (approximate: boolean): string => "starting " + (approximate ? "" : "the ")
}
