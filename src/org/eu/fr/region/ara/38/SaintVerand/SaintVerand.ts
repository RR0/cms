import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const saintVerand = City.create(String(IsereCityCode.SaintVerand), isere,
  Place.fromDMS("45° 10′ 26″ N, 5° 19′ 57″E"))
