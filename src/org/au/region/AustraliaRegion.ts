import { AustraliaRegionCode } from "./AustraliaRegionCode.js"
import { Place } from "@rr0/place"
import { australia } from "../Australia.js"
import { Region } from "../../country/region/Region.js"

export function australiaRegion(code: AustraliaRegionCode, place: Place) {
  return new Region(code, australia, [place])
}
