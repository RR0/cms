import { Place } from "@rr0/place"
import { CalvadosCityCode } from "../CalvadosCityCode.js"
import { calvados } from "../Calvados.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const pontLEveque14 = City.create(String(CalvadosCityCode.PontLEveque), calvados,
  Place.fromLocation(49.285556, 0.183889))
