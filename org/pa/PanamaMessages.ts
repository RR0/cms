import { PanamaRegionCode } from "./region/PanamaRegionCode"
import { RegionMessages } from "../country"

export type PanamaMessages = { [key in PanamaRegionCode]: RegionMessages }
