import { RegionMessages } from "../country"
import { UkRegionCode } from "./region/UkRegionCode"

export type UkRegionMessagesList = { [key in UkRegionCode]: RegionMessages }
