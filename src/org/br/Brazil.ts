import { Place } from "@rr0/place"
import { CountryCode, OrganizationKind } from "@rr0/data"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"
import { CmsOrganization } from "../CmsOrganization.js"

export const brazil = new CmsOrganization(CountryCode.br, [], OrganizationKind.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new CmsOrganization(code, [place], OrganizationKind.region, brazil)
}
