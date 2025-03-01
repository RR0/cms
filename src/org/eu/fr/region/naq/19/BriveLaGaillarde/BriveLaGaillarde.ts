import { Place } from "@rr0/place"
import { CorrezeCityCode } from "../CorrezeCityCode.js"
import { correze } from "../Correze.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const briveLaGaillarde = City.create(String(CorrezeCityCode.BriveLaGaillarde), correze,
  Place.fromDMS(`45°09′30″N,1°31′55″E`))
