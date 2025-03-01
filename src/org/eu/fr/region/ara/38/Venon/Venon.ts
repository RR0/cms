import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const venon = City.create(String(IsereCityCode.Venon), isere, Place.fromDMS("45° 10′ 22″N, 5° 48′ 19″E"))
