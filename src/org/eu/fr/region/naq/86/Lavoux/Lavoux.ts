import { Place } from "@rr0/place"
import { VienneCityCode } from "../VienneCityCode.js"
import { vienne } from "../Vienne"
import { City } from "../../../../../../country"

export const lavoux = City.create(String(VienneCityCode.Lavoux), vienne, Place.fromDMS("46°35′47″N,0°31′49″E"))
