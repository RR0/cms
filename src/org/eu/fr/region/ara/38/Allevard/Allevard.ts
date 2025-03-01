import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const allevard = City.create(String(IsereCityCode.Allevard), isere, Place.fromDMS("45° 23′ 40″N, 6° 04′ 29″E"))
