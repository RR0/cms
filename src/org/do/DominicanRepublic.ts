import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { DominicanRepublicRegionCode } from "./region/DominicanRepublicRegionCode.js"

export const dominicanRepublic = new Country(CountryCode.do)

export function dominicanRepublicRegion(code: DominicanRepublicRegionCode, place: Place) {
  return new Region(code, dominicanRepublic, [place])
}
