import { Place } from "@rr0/place"
import { CountryCode } from "@rr0/data"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"
import { CmsOrganization } from "../CmsOrganization.js"
import { OrganizationKind } from "../../../../data/src/org/OrganizationKind"

export const brazil = new CmsOrganization(CountryCode.br, [], OrganizationKind.country)

export function brazilRegion(code: BrazilRegionCode, place: Place) {
  return new CmsOrganization(code, [place], OrganizationKind.region, brazil)
}
