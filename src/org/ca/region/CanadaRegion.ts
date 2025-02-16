import { CanadaRegionCode } from "./CanadaRegionCode.js"
import { Place } from "@rr0/place"
import { canada } from "../Canada.js"
import { Region } from "../../country/region/Region.js"

export function canadaRegion(code: CanadaRegionCode, place: Place) {
  return new Region(code, canada, [place])
}
