import { philippines } from "../Philippines.js"
import { PhilippinesRegionCode } from "./PhilippinesRegionCode.js"
import { Region } from "../../country/index.js"
import { Place } from "../../../place/index.js"

export function philippinesRegion(code: PhilippinesRegionCode, place: Place) {
  return new Region(code, philippines, [place])
}
