import { Place } from "@rr0/place"
import { HautesAlpesCityCode } from "../HautesAlpesCityCode.js"
import { hautesAlpes } from "../HautesAlpes.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const briancon05 = City.create(String(HautesAlpesCityCode.Briancon), hautesAlpes,
  Place.fromLocation(44.896389, 6.635556))
