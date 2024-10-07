import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { TunisiaRegionCode } from "./region/TunisiaRegionCode.js"

export const tunisia = new Country(CountryCode.tn)

export function tunisiaRegion(code: TunisiaRegionCode, place: Place) {
  return new Region(code, tunisia, [place])
}
