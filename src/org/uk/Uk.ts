import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { UkRegionCode } from "./region/UkRegionCode.js"

export const uk = new Country(CountryCode.uk)

export function ukRegion(code: UkRegionCode, place: Place) {
  return new Region(code, uk, [place])
}
