import { Place } from "@rr0/place"
import { CharenteCityCode } from "../CharenteCityCode.js"
import { charente } from "../Charente.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const montigne16 = City.create(String(CharenteCityCode.Montigne), charente,
  Place.fromDMS("45° 49′ 25″N, 0° 04′ 38″O"))
