import { Place } from "@rr0/place"
import { ArdennesCityCode } from "../ArdennesCityCode.js"
import { ardennes } from "../Ardennes"
import { City } from "../../../../../../country"

export const revin = City.create(String(ArdennesCityCode.Revin), ardennes, Place.fromDMS("49° 56′ 00″ N, 4° 38′ 00″E"))
