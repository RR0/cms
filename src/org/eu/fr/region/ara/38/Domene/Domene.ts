import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const domene = City.create(String(IsereCityCode.Domene), isere, Place.fromDMS("45°12′12″N,5°50′23″E"))
