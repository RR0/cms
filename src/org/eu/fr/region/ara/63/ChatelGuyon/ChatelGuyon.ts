import { Place } from "@rr0/place"
import { PuyDeDomeCityCode } from "../PuyDeDomeCityCode.js"
import { puyDeDome } from "../PuyDeDome.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chatelGuyon = City.create(String(PuyDeDomeCityCode.ChatelGuyon), puyDeDome,
  Place.fromDMS("45° 55′ 24″N, 3° 03′ 54″E"))
