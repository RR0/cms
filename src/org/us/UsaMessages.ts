import { RegionMessages } from "../country/index.js"
import { UsaStates } from "./region/UsaStates.js"

export type UsaRegionMessagesList = { [key in UsaStates]: RegionMessages }
