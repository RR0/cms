import { CountryCode } from "../country"
import { Place } from "../../place/Place"
import { BrazilRegionCode } from "./region/BrazilRegionCode"
import { Organization, OrganizationKind } from "../Organization"

export const brazil = new Organization(CountryCode.br, [], OrganizationKind.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new Organization(code, [place], OrganizationKind.region, brazil)
}
