import { Place } from "@rr0/place"
import { HautsDeSeineCityCode } from "../HautsDeSeineCityCode.js"
import { hautsDeSeine } from "../HautsDeSeine.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const boisColombes = City.create(String(HautsDeSeineCityCode.BoisColombes), hautsDeSeine,
  Place.fromDMS("48° 55′ 03″N,2°16′06″E"))
