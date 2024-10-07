import { PanamaRegionCode } from "./region/PanamaRegionCode.js"
import { RegionMessages } from "../country/index.js"

export type PanamaMessages = { [key in PanamaRegionCode]: RegionMessages }
