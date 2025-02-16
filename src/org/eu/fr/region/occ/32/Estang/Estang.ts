import { Place } from "@rr0/place"
import { GersCityCode } from "../GersCityCode.js"
import { gers } from "../Gers"
import { City } from "../../../../../../country"

export const estang = City.create(String(GersCityCode.Estang), gers, Place.fromDMS("43° 52′ 03″ N, 0° 06′ 27″ O"))
