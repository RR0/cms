import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { UkRegionCode } from "./region/UkRegionCode.js"

export const uk = new CmsCountry(CountryCode.uk)

export function ukRegion(code: UkRegionCode, place: Place) {
  return new Region(code, uk, [place])
}
