import { CountryCode } from "@rr0/data"
import { CmsCountry } from "../country/CmsCountry"
import { Place } from "@rr0/place"
import { Region } from "../country/region/Region.js"
import { TunisiaRegionCode } from "./region/TunisiaRegionCode.js"

export const tunisia = new CmsCountry(CountryCode.tn)

export function tunisiaRegion(code: TunisiaRegionCode, place: Place) {
  return new Region(code, tunisia, [place])
}
