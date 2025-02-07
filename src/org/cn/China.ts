import { Country, CountryCode } from "../country/index.js"
import { Place } from "../../place/Place.js"
import { Region } from "../country/region/Region.js"
import { ChinaRegionCode } from "./region/ChinaRegionCode.js"

export const china = new Country(CountryCode.cn)

export function chinaRegion(code: ChinaRegionCode, place: Place) {
  return new Region(code, china, [place])
}
