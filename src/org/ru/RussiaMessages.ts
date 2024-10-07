import { RegionMessages } from "../country/index.js"
import { RussiaRegionCode } from "./region/RussiaRegionCode.js"

export type RussiaRegionMessagesList = { [key in RussiaRegionCode]: RegionMessages }
