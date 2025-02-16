import { Place } from "@rr0/place"
import { PuyDeDomeCityCode } from "../PuyDeDomeCityCode.js"
import { puyDeDome } from "../PuyDeDome"
import { City } from "../../../../../../country"

export const billom = City.create(String(PuyDeDomeCityCode.Billom), puyDeDome, Place.fromDMS("45°53′40″N,3°06′48″E"))
