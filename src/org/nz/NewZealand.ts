import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place } from "@rr0/place"
import { NewZealandRegionCode } from "./region/NewZealandRegionCode.js"
import { Region } from "../country/region/Region.js"

export const newZealand = new CmsCountry(CountryCode.nz)

export function newZealandRegion(code: NewZealandRegionCode, place: Place) {
  return new Region(code, newZealand, [place])
}
