import { AlgeriaRegionCode } from "./AlgeriaRegionCode.js"
import { Place } from "@rr0/place"
import { algeria } from "../Algeria.js"
import { Region } from "../../country/region/Region.js"
import { RegionMessages } from "../../country/index.js"

export function algeriaRegion(code: AlgeriaRegionCode, place: Place) {
  return new Region<RegionMessages<any>, AlgeriaRegionCode>(code, algeria, [place])
}
