import { Country, CountryCode } from "../country"
import { Place } from "../../place/Place"
import { Region } from "../country/region/Region"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode"

export const mozambique = new Country(CountryCode.mz)

export function mozambiqueRegion(code: MozambiqueRegionCode, place: Place) {
  return new Region(code, mozambique, [place])
}