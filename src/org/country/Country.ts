import { CountryCode } from "./CountryCode.js"
import { Place } from "@rr0/place"
import { Organization } from "../Organization.js"
import { OrganizationKind } from "../OrganizationKind"

export class Country extends Organization {

  constructor(code: CountryCode, places: Place[] = []) {
    super(code, places, OrganizationKind.country)
  }
}
