import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { RussiaRegionCode } from "./region/RussiaRegionCode.js"

export const russia = new CmsCountry(CountryCode.ru)

export function russiaRegion(code: RussiaRegionCode, place: Place) {
  return new Region(code, russia, [place])
}
