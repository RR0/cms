import { Place } from "@rr0/place"
import { GersCityCode } from "../GersCityCode.js"
import { gers } from "../Gers.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const estang = City.create(String(GersCityCode.Estang), gers, Place.fromDMS("43° 52′ 03″ N, 0° 06′ 27″ O"))
