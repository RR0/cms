import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const valbonnais = City.create(String(IsereCityCode.Valbonnais), isere, Place.fromDMS("44°54′03″N,5°54′18″E"))
