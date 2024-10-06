import { Country, CountryCode } from "../country"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { UkRegionCode } from "./region/UkRegionCode"

export const uk = new Country(CountryCode.uk)

export function ukRegion(code: UkRegionCode, place: Place) {
  return new Region(code, uk, [place])
}
