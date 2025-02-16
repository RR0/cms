import { Place } from "@rr0/place"
import { CharenteCityCode } from "../CharenteCityCode.js"
import { charente } from "../Charente"
import { City } from "../../../../../../country"

export const montigne16 = City.create(String(CharenteCityCode.Montigne), charente,
  Place.fromDMS("45° 49′ 25″N, 0° 04′ 38″O"))
