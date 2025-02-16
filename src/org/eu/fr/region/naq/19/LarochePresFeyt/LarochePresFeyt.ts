import { Place } from "@rr0/place"
import { CorrezeCityCode } from "../CorrezeCityCode.js"
import { correze } from "../Correze"
import { City } from "../../../../../../country"

export const larochePresFeyt = City.create(String(CorrezeCityCode.LarochePresFeyt), correze,
  Place.fromDMS(`45°42′21″N,2°30′27″E`))
