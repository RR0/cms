import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { MexicoRegionCode } from "./region/MexicoRegionCode.js"

export const mexico = new CmsCountry(CountryCode.mx)

export function mexicoRegion(code: MexicoRegionCode, place: Place) {
  return new Region(code, mexico, [place])
}
