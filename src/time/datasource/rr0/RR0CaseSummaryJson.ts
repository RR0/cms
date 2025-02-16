import { RR0EventJson } from "@rr0/data"

export interface RR0CaseSummaryJson extends RR0EventJson {
  /**
   * A unique identifier for this data.
   * // TODO: Make it mandatory
   */
  id?: string

  /**
   * The directory where the data is stored, relatively to RR0's root.
   * Should end with a trailing slash ("/").
   */
  dirName?: string

  /**
   * Public URL of the data (not the RR0 URL)
   */
  url?: string

  /**
   * Events of the data.
   */
  events: RR0EventJson[]

  readonly eventType: "sighting"

  /**
   * Parent data id
   */
  parent?: string
}
