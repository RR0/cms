import { GermanyRegionCode } from "./region/GermanyRegionCode.js"
import { Place } from "@rr0/place"
import { Region } from "../../country/region/Region.js"
import { CmsCountry } from "../../country/CmsCountry.js"
import { CountryCode } from "@rr0/data"

export const germany = new CmsCountry(CountryCode.de)

export function germanyRegion(code: GermanyRegionCode, place: Place) {
  return new Region(code, germany, [place])
}
