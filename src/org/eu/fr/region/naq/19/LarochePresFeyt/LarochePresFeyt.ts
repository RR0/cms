import { Place } from "@rr0/place"
import { CorrezeCityCode } from "../CorrezeCityCode.js"
import { correze } from "../Correze.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const larochePresFeyt = City.create(String(CorrezeCityCode.LarochePresFeyt), correze,
  Place.fromDMS(`45°42′21″N,2°30′27″E`))
