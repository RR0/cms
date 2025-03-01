import { Place } from "@rr0/place"
import { ArdennesCityCode } from "../ArdennesCityCode.js"
import { ardennes } from "../Ardennes.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const revin = City.create(String(ArdennesCityCode.Revin), ardennes, Place.fromDMS("49° 56′ 00″ N, 4° 38′ 00″E"))
