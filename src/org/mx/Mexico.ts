import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { MexicoRegionCode } from "./region/MexicoRegionCode.js"

export const mexico = new Country(CountryCode.mx)

export function mexicoRegion(code: MexicoRegionCode, place: Place) {
  return new Region(code, mexico, [place])
}
