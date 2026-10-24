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
  /**
   * The word that, written right before an interval, asks for it to be rendered as `betweenAnd` ("between", "entre").
   */
  between: RegExp
  /**
   * The words that, written right before a time, need it rendered in full: a relative wording can't follow them
   * ("en l'année suivante", "in the year after").
   */
  preposition: RegExp
  /**
   * The words that, written right before a time, already tell that it is approximate ("vers", "around").
   */
  approximation: RegExp
  betweenAnd(startReplacement: string, endReplacement: string): string
  /**
   * @param date The date ("jeudi 12").
   * @param time The time of day ("19 h").
   * @param approximate If the time of day only is approximate ("jeudi 12 vers 19 h").
   */
  dateTime(date: string, time: string, approximate: boolean): string
  on(approximate: boolean): string
  in(approximate: boolean): string
  starting(approximate: boolean): string
}
