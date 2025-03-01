import { Place } from "@rr0/place"
import { SartheCityCode } from "../SartheCityCode.js"
import { sarthe } from "../Sarthe.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const leMans72 = City.create(String(SartheCityCode.LeMans), sarthe, Place.fromLocation(48.004167, 0.196944))
