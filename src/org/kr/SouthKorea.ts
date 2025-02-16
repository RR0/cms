import { Country, CountryCode } from "../country/index.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { SouthKoreaRegionCode } from "./region/SouthKoreaRegionCode.js"

export const southKorea = new Country(CountryCode.kr)

export function southKoreaRegion(code: SouthKoreaRegionCode, place: Place) {
  return new Region(code, southKorea, [place])
}
