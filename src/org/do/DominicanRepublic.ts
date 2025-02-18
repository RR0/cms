import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { DominicanRepublicRegionCode } from "./region/DominicanRepublicRegionCode.js"

export const dominicanRepublic = new CmsCountry(CountryCode.do)

export function dominicanRepublicRegion(code: DominicanRepublicRegionCode, place: Place) {
  return new Region(code, dominicanRepublic, [place])
}
