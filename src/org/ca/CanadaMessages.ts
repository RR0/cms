import { CanadaRegionCode } from "./region/CanadaRegionCode"
import { RegionMessages } from "../country"

export type CanadaMessages = { [key in CanadaRegionCode]: RegionMessages }
