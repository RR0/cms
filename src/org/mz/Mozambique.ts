import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { MozambiqueRegionCode } from "./region/MozambiqueRegionCode.js"

export const mozambique = new CmsCountry(CountryCode.mz)

export function mozambiqueRegion(code: MozambiqueRegionCode, place: Place) {
  return new Region(code, mozambique, [place])
}
