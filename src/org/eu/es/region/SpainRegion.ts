import { Place } from "@rr0/place"
import { europeanRegion } from "../../Region_eu.js"
import { spain } from "../Spain.js"
import { SpainRegionCode } from "./SpainRegionCode.js"

export function spainRegion(code: SpainRegionCode, place: Place) {
  return europeanRegion(code, spain, place)
}
