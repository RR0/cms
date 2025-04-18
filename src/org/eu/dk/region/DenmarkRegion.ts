import { DenmarkRegionCode } from "./DenmarkRegionCode.js"
import { Place } from "@rr0/place"
import { europeanRegion } from "../../Region_eu.js"
import { denmark } from "../Denmark.js"

export function denmarkRegion(code: DenmarkRegionCode, place: Place) {
  return europeanRegion(code, denmark, place)
}
