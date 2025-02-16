import { Place } from "@rr0/place"
import { RhoneCityCode } from "../RhoneCityCode"
import { rhone } from "../Rhone"
import { City } from "../../../../../../country"

export const lyon69 = City.create(String(RhoneCityCode.Lyon), rhone, Place.fromLocation(45.757778, 4.832222))
