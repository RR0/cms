import { Place } from "@rr0/place"
import { LotEtGaronneCityCode } from "../LotEtGaronneCityCode.js"
import { lotEtGaronne } from "../LotEtGaronne"
import { City } from "../../../../../../country"

export const laroqueTimbaut = City.create(String(LotEtGaronneCityCode.LaroqueTimbaut), lotEtGaronne,
  Place.fromDMS("43°53′29″N,0°29′58″O"))
