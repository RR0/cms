export type RR0TimeMessages = {
  duration: {
    days: (d: number) => string
    hours: (h: number) => string
    minutes: (mn: number) => string
    seconds: (mn: number) => string
    lastSeparator: string
    approximate(txt: string): string
  },
  relative: {
    hour: {
      before: string
      after: string
    },
    year: {
      before: string
      after: string
    },
    month: {
      before: string
      after: string
      later: string
    },
    day: {
      before: string
      after: string
    }
  },
  fromTo(startReplacement: string, endReplacement: string): string
  on(approximate: boolean): string
  in(approximate: boolean): string
  starting(approximate: boolean): string
}
