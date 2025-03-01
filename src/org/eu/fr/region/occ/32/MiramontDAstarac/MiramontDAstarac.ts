import { Place } from "@rr0/place"
import { GersCityCode } from "../GersCityCode.js"
import { gers } from "../Gers.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const miramontDAstarac = City.create(String(GersCityCode.MiramontDAstarac), gers,
  Place.fromDMS("43° 32′ 51″N, 0° 28′12″E"))
