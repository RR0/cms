import { RegionMessages } from "../country"
import { UsaStates } from "./region/UsaStates"

export type UsaRegionMessagesList = { [key in UsaStates]: RegionMessages }
