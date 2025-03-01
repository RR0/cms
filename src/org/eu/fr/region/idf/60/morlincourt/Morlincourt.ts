import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const morlincourt = City.create(String(OiseCityCode.Morlincourt), oise, Place.fromDMS("49°34′14″N,3°02′14″E"))
