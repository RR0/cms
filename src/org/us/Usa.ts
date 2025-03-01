import { UsaStates } from "./region/UsaStates.js"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry.js"

export const usa = new CmsCountry(CountryCode.us, [])

export function usaRegion(code: UsaStates, place: Place) {
  return new Region(code, usa, [place])
}
