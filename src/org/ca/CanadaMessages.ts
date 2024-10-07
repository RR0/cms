import { CanadaRegionCode } from "./region/CanadaRegionCode.js"
import { RegionMessages } from "../country/index.js"

export type CanadaMessages = { [key in CanadaRegionCode]: RegionMessages }
