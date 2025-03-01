import { Place } from "@rr0/place"
import { CreuseCityCode } from "../CreuseCityCode.js"
import { creuse } from "../Creuse.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const chambonSurVoueize23 = City.create(String(CreuseCityCode.ChambonSurVoueize), creuse,
  Place.fromLocation(46.19, 2.425833))
