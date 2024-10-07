import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { RussiaRegionCode } from "./region/RussiaRegionCode.js"

export const russia = new Country(CountryCode.ru)

export function russiaRegion(code: RussiaRegionCode, place: Place) {
  return new Region(code, russia, [place])
}
