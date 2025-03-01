import { Place } from "@rr0/place"
import { VaucluseCityCode } from "../VaucluseCityCode.js"
import { vaucluse } from "../Vaucluse.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const bollene = City.create(String(VaucluseCityCode.Bollene), vaucluse, Place.fromDMS("44°16′52″N,4°44′58″E"))
