import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const renage = City.create(String(IsereCityCode.Renage), isere, Place.fromDMS("45° 20′ 03″N, 5° 29′ 10″E"))
