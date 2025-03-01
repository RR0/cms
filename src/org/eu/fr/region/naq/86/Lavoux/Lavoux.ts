import { Place } from "@rr0/place"
import { VienneCityCode } from "../VienneCityCode.js"
import { vienne } from "../Vienne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const lavoux = City.create(String(VienneCityCode.Lavoux), vienne, Place.fromDMS("46°35′47″N,0°31′49″E"))
