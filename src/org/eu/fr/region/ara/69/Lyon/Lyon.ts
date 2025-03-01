import { Place } from "@rr0/place"
import { RhoneCityCode } from "../RhoneCityCode.js"
import { rhone } from "../Rhone.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const lyon69 = City.create(String(RhoneCityCode.Lyon), rhone, Place.fromLocation(45.757778, 4.832222))
