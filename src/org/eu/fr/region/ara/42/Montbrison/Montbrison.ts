import { Place } from "@rr0/place"
import { LoireCityCode } from "../LoireCityCode.js"
import { loire } from "../Loire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const montbrison42 = City.create(String(LoireCityCode.Montbrison), loire,
  Place.fromDMS("45° 36′ 30″ N, 4° 03′ 57″E"))
