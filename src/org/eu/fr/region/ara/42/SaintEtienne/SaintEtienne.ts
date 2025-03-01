import { Place } from "@rr0/place"
import { LoireCityCode } from "../LoireCityCode.js"
import { loire } from "../Loire.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const stEtienne42 = City.create(String(LoireCityCode.StEtienne), loire, Place.fromDMS("45°26′05″N,4°23′25″E"))
