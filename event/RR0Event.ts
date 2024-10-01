import { RR0Data } from "../data"
import { People } from "../people"

export type RR0EventType =
  "birth"
  | "death"
  | "image"
  | "book"
  | "article"
  | "sighting"

export interface RR0Event extends RR0Data {
  type: RR0EventType
  subject?: People
}
