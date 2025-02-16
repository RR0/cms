import { Country, CountryCode } from "../country/index.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { SeychellesRegionCode } from "./region/SeychellesRegionCode.js"

export const seychelles = new Country(CountryCode.sc)

export function seychellesRegion(code: SeychellesRegionCode, place: Place) {
  return new Region(code, seychelles, [place])
}
