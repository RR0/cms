import { Place } from "@rr0/place"
import { HautsDeSeineCityCode } from "../HautsDeSeineCityCode.js"
import { hautsDeSeine } from "../HautsDeSeine.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const nanterre92 = City.create(String(HautsDeSeineCityCode.Nanterre), hautsDeSeine,
  Place.fromDMS("48° 53′ 31″N, 2° 12′ 26″E"))
