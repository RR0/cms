import { canadaRegion } from "../CanadaRegion.js"
import { CanadaRegionCode } from "../CanadaRegionCode.js"
import { Place } from "@rr0/place"

export let britishColumbia = canadaRegion(CanadaRegionCode.bc, Place.fromLocation(47.466667, 0.833333))
