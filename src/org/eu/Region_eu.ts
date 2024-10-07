import { Place } from "../../place"
import { Organization } from "../Organization"
import { EuropeRegionCode } from "./EuropeRegionCode"
import { Region } from "../country"

export function europeanRegion(code: EuropeRegionCode, country: Organization, place: Place) {
  return new Region(code, country, [place])
}
