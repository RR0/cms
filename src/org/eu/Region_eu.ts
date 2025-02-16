import { Organization } from "../Organization.js"
import { EuropeRegionCode } from "./EuropeRegionCode.js"
import { Region } from "../country/index.js"
import { Place } from "@rr0/place"

export function europeanRegion(code: EuropeRegionCode, country: Organization, place: Place) {
  return new Region(code, country, [place])
}
