import { Place } from "../../place/index.js"
import { Organization } from "../Organization.js"
import { EuropeRegionCode } from "./EuropeRegionCode.js"
import { Region } from "../country/index.js"

export function europeanRegion(code: EuropeRegionCode, country: Organization, place: Place) {
  return new Region(code, country, [place])
}
