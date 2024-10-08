import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode.js"
import { Region } from "../country/region/Region.js"

export const newZealand = new Country(CountryCode.nz)

export function newZealandRegion(code: NewZealandRegionCode, place: Place) {
  return new Region(code, newZealand, [place])
}
