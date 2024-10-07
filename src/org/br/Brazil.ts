import { CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"
import { Organization, OrganizationKind } from "../Organization.js"

export const brazil = new Organization(CountryCode.br, [], OrganizationKind.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationKind.region, brazil)
}
