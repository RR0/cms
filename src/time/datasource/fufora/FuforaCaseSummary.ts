import { Level2Date as EdtfDate } from "@rr0/time"

export interface FuforaCaseSummary {
  readonly id: string
  readonly url: string
  readonly city: string
  readonly sightingPlace: string | undefined
  readonly dateTime: EdtfDate
  readonly dateTimeRefinement?: string
  readonly durationClock?: string
  readonly durationEstimation?: string
  readonly classification: string
}
