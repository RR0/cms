import { Country, CountryCode } from "../country"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { SouthKoreaRegionCode } from "./region/SouthKoreaRegionCode"

export const southKorea = new Country(CountryCode.kr)

export function southKoreaRegion(code: SouthKoreaRegionCode, place: Place) {
  return new Region(code, southKorea, [place])
}