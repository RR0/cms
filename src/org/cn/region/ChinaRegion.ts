import { ChinaRegionCode } from "./ChinaRegionCode.js"
import { Place } from "../../../place/Place.js"
import { china } from "../China.js"
import { Region } from "../../country/region/Region.js"

export function chinaRegion(code: ChinaRegionCode, place: Place) {
  return new Region(code, china, [place])
}
