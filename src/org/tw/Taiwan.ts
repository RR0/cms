import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { TaiwanRegionCode } from "./region/TaiwanRegionCode.js"

export const taiwan = new CmsCountry(CountryCode.tw)

export function taiwanRegion(code: TaiwanRegionCode, place: Place) {
  return new Region(code, taiwan, [place])
}
