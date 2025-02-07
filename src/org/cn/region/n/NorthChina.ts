import { ChinaRegionCode } from "../ChinaRegionCode.js"
import { Place } from "../../../../place/Place.js"
import { chinaRegion } from "../ChinaRegion.js"

export const northChina = chinaRegion(ChinaRegionCode.n, Place.fromDMS("38°02′32″N,114°30′31″E"))
