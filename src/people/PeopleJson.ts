import { Occupation } from "./Occupation.js"
import { Gender } from "@rr0/common"
import { CountryCode } from "../org/country/CountryCode.js"
import { Level2Date as EdtfDate } from "@rr0/time"
import { RR0DataJson } from "@rr0/data/dist/RR0DataJson"
import { RR0EventJson } from "@rr0/data/dist/event/RR0EventJson"

export class PeopleJson implements RR0DataJson {
  readonly type = "people"

  title: string

  name: string

  /**
   * The people actually doesn't exist.
   */
  hoax = false

  lastAndFirstName: string

  firstNames: string[] = []
  lastName = ""
  pseudonyms: string[] = []
  occupations: Occupation[] = []
  countries: CountryCode[] = []
  /**
   * The people has been caught lying or has confessed a hoax.
   */
  discredited = false
  /**
   * @deprecated Use a "birth"-typed sub-data instead.
   */
  birthTime?: EdtfDate
  deathTime?: EdtfDate
  gender?: Gender
  id: string
  dirName?: string
  image?: string
  url?: string
  events: RR0EventJson[] = []
}
