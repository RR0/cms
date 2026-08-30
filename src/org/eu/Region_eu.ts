import { CmsOrganization } from "../CmsOrganization.js"
import { EuropeRegionCode } from "./EuropeRegionCode.js"
import { Region } from "../country/region/Region.js"
import { Place } from "@rr0/place"

export function europeanRegion(code: EuropeRegionCode, country: CmsOrganization, place: Place) {
  return new Region(code, country, [place])
}
