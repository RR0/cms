import { Place } from "../../../place"
import { Organization } from "../../../org"
import { RR0Data } from "../../../data"
import { RR0Event } from "../../../event"

export type NamedPlace = {
  readonly place?: Place
  readonly org?: Organization
  readonly name: string
}

export interface RR0CaseSummary extends RR0Event {
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
  events: RR0Event[]
  /**
   * The data type ("people", "place", "org", "book", "case", "sighting"...)
   */
  readonly type: "sighting"
  /**
   * Parent data.
   */
  parent?: RR0Data
}