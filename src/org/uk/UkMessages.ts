import { RegionMessages } from "../country/index.js"
import { UkRegionCode } from "./region/UkRegionCode.js"

export type UkRegionMessagesList = { [key in UkRegionCode]: RegionMessages }
