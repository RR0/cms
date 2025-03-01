import { Place } from "@rr0/place"
import { SaoneEtLoireCityCode } from "../SaoneEtLoireCityCode.js"
import { saoneEtLoire } from "../SaoneEtLoire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const joncy = City.create(String(SaoneEtLoireCityCode.Joncy), saoneEtLoire,
  Place.fromDMS("46° 36′ 51″N, 4° 33′ 32″E"))
