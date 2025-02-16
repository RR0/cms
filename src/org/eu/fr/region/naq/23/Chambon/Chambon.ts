import { Place } from "@rr0/place"
import { CreuseCityCode } from "../CreuseCityCode.js"
import { creuse } from "../Creuse"
import { City } from "../../../../../../country"

export const chambonSurVoueize23 = City.create(String(CreuseCityCode.ChambonSurVoueize), creuse,
  Place.fromLocation(46.19, 2.425833))
