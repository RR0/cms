import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode.js"

export const mozambique = new Country(CountryCode.mz)

export function mozambiqueRegion(code: MozambiqueRegionCode, place: Place) {
  return new Region(code, mozambique, [place])
}
