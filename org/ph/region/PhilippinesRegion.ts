import { philippines } from "../Philippines"
import { PhilippinesRegionCode } from "./PhilippinesRegionCode"
import { Region } from "../../country"
import { Place } from "../../../place"

export function philippinesRegion(code: PhilippinesRegionCode, place: Place) {
  return new Region(code, philippines, [place])
}
