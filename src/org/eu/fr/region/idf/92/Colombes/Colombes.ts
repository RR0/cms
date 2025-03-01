import { Place } from "@rr0/place"
import { HautsDeSeineCityCode } from "../HautsDeSeineCityCode.js"
import { hautsDeSeine } from "../HautsDeSeine.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const colombes = City.create(String(HautsDeSeineCityCode.Colombes), hautsDeSeine,
  Place.fromDMS("48° 55′ 25″ N, 2° 15′ 08″E"))
