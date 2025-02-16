import { Country, CountryCode } from "../country/index.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { TaiwanRegionCode } from "./region/TaiwanRegionCode.js"

export const taiwan = new Country(CountryCode.tw)

export function taiwanRegion(code: TaiwanRegionCode, place: Place) {
  return new Region(code, taiwan, [place])
}
