import { Place } from "@rr0/place"
import { LotEtGaronneCityCode } from "../LotEtGaronneCityCode.js"
import { lotEtGaronne } from "../LotEtGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const laroqueTimbaut = City.create(String(LotEtGaronneCityCode.LaroqueTimbaut), lotEtGaronne,
  Place.fromDMS("43°53′29″N,0°29′58″O"))
