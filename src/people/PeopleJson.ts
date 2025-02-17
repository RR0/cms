import { RR0DataJson } from "@rr0/data/dist/RR0DataJson"
import { RR0EventJson } from "@rr0/data/dist/event/RR0EventJson"

export type PeopleJson = RR0DataJson & {
  type?: "people"

  title?: string

  name?: string

  /**
   * The people actually doesn't exist.
   */
  hoax?: boolean

  firstNames?: string[]
  lastName?: string
  pseudonyms?: string[]
  occupations?: string[]
  countries?: string[]
  /**
   * The people has been caught lying or has confessed a hoax.
   */
  discredited?: boolean

  /**
   * @deprecated Use a "birth"-typed event instead.
   */
  birthTime?: string

  /**
   * @deprecated Use a "death"-typed event instead.
   */
  deathTime?: string

  gender?: "male" | "female"
  id?: string
  dirName?: string
  image?: string
  url?: string
  events?: RR0EventJson[]
}
