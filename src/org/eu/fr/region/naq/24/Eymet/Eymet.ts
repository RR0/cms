import { Place } from "@rr0/place"
import { DordogneCityCode } from "../DordogneCityCode.js"
import { dordogne } from "../Dordogne"
import { City } from "../../../../../../country"

export const eymet = City.create(String(DordogneCityCode.Eymet), dordogne, Place.fromDMS("44° 40′ 07″ N, 0° 23′ 56″ E"))
