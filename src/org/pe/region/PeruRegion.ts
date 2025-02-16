import { peru } from "../Peru.js"
import { PeruRegionCode } from "./PeruRegionCode.js"
import { Region } from "../../country/region/Region.js"
import { Place } from "@rr0/place"

export function peruRegion(code: PeruRegionCode, place: Place) {
  return new Region(code, peru, [place])
}
