import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chirens = City.create(String(IsereCityCode.Chirens), isere, Place.fromDMS("45° 24′ 50″N, 5° 33′ 21″E"))
