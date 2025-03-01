import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { ColombiaRegionCode } from "./region/ColombiaRegionCode.js"

export const colombia = new CmsCountry(CountryCode.co)

export function colombiaRegion(code: ColombiaRegionCode, place: Place) {
  return new Region(code, colombia, [place])
}
