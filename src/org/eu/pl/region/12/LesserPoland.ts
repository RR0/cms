import { Place } from "@rr0/place"
import { PolandRegionCode } from "../PolandRegionCode.js"
import { polandRegion } from "../PolandRegion.js"

export const lesserPoland = polandRegion(PolandRegionCode.lesserPoland, Place.fromDMS("50°3′41″N,19°56′18″E"))
