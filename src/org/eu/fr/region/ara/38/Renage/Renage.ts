import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const renage = City.create(String(IsereCityCode.Renage), isere, Place.fromDMS("45° 20′ 03″N, 5° 29′ 10″E"))
