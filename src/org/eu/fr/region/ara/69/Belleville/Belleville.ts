import { Place } from "@rr0/place"
import { RhoneCityCode } from "../RhoneCityCode.js"
import { rhone } from "../Rhone"
import { City } from "../../../../../../country"

export const belleville69 = City.create(String(RhoneCityCode.Belleville), rhone,
  Place.fromDMS("46° 06′ 34″ N, 4° 45′ 00″ E"))
