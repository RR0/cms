import { CountryCode } from "../country/index.js"
import { Place } from "@rr0/place"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"
import { Organization } from "../Organization.js"
import { OrganizationKind } from "../OrganizationKind"

export const brazil = new Organization(CountryCode.br, [], OrganizationKind.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationKind.region, brazil)
}
