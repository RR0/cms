import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { SeychellesRegionCode } from "./region/SeychellesRegionCode.js"

export const seychelles = new CmsCountry(CountryCode.sc)

export function seychellesRegion(code: SeychellesRegionCode, place: Place) {
  return new Region(code, seychelles, [place])
}
