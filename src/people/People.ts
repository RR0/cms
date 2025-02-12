import { Occupation } from "./Occupation.js"
import { StringUtil } from "../util/string/StringUtil.js"
import { Gender } from "@rr0/common"
import { CountryCode } from "../org/country/CountryCode.js"
import { RR0Data, RR0Event } from "@rr0/data"
import { Level2Date as EdtfDate, Level2Duration as Duration, TimeContext } from "@rr0/time"

export class People implements RR0Data {
  readonly type = "people"

  title: string

  name: string

  /**
   * The people actually doesn't exist.
   */
  hoax = false

  lastAndFirstName: string

  constructor(
    public firstNames: string[] = [],
    public lastName = "",
    readonly pseudonyms: string[] = [],
    readonly occupations: Occupation[] = [],
    readonly countries: CountryCode[] = [],
    /**
     * The people has been caught lying or has confessed a hoax.
     */
    readonly discredited = false,
    /**
     * @deprecated Use a "birth"-typed sub-data instead.
     */
    birthTime?: EdtfDate,
    deathTime?: EdtfDate,
    readonly gender?: Gender,
    readonly id = lastName + firstNames.join(""),
    readonly dirName?: string,
    public image?: string,
    readonly url?: string,
    readonly events: RR0Event[] = []
  ) {
    this.lastAndFirstName = this.getLastAndFirstName()
    this.title = this.firstAndLastName
    this.name = this.lastName
    if (!this.birthTime && birthTime) {
      events.push(
        {type: "birth", time: new TimeContext(birthTime.year.value, birthTime.month.value, birthTime.day.value)})
    }
    if (!this.deathTime && deathTime) {
      events.push(
        {type: "death", time: new TimeContext(deathTime.year.value, deathTime.month.value, deathTime.day.value)})
    }
  }

  get birthTime(): TimeContext {
    return this.events.find(event => event.type === "birth")?.time
  }

  get deathTime(): TimeContext {
    return this.events.find(event => event.type === "death")?.time
  }

  get firstAndLastName(): string {
    const {lastNameStr, firstNameStr} = this.getLastAndFirstNames()
    return lastNameStr && firstNameStr ? firstNameStr + " " + lastNameStr : lastNameStr || firstNameStr
  }

  static getUrl(lastName: string, firstNames: string[]): string {
    const normalizedLastName = StringUtil.removeAccents(lastName)
    const normalizedFirstNames = firstNames.map(StringUtil.removeAccents).map(StringUtil.withoutDots)
    return `people/${normalizedLastName.charAt(
      0).toLowerCase()}/${normalizedLastName}${normalizedFirstNames.join("")}`
  }

  getLastAndFirstName(): string {
    const {lastNameStr, firstNameStr} = this.getLastAndFirstNames()
    return lastNameStr && firstNameStr ? lastNameStr + ", " + firstNameStr : lastNameStr || firstNameStr
  }

  isDeceased(from?: EdtfDate): boolean {
    if (this.deathTime) {
      return true
    } else if (this.birthTime) {
      return this.probablyDead(this.birthTime.date, from)
    } else {
      return false
    }
  }

  getAge(from?: EdtfDate): number | undefined {
    if (this.birthTime) {
      let timeDelta: Duration
      if (this.deathTime) {
        timeDelta = Duration.between(this.birthTime.date, this.deathTime.date)
      } else if (!this.probablyDead(this.birthTime.date)) {
        const now = from?.getTime() ?? new EdtfDate()
        timeDelta = Duration.between(this.birthTime.date, now)
      } else {
        return undefined
      }
      return timeDelta.toSpec().years.value
    }
  }

  probablyDead(birth: EdtfDate, at?: EdtfDate): boolean {
    const now = at?.getTime() ?? new EdtfDate()
    const timeDelta = Duration.between(this.birthTime.date, now)
    return timeDelta.toSpec().years.value > 120
  }

  clone(): People {
    return new People(
      this.firstNames,
      this.lastName,
      this.pseudonyms,
      this.occupations,
      this.countries,
      this.discredited,
      this.birthTime,
      this.deathTime,
      this.gender,
      this.id,
      this.dirName,
      this.image,
      this.url,
      this.events
    )
  }

  protected getLastAndFirstNames() {
    const lastNameStr = StringUtil.camelToText(this.lastName)
    const firstNameStr = this.firstNames.length > 0 ? this.firstNames.join(" ") : ""
    return {lastNameStr, firstNameStr}
  }
}
