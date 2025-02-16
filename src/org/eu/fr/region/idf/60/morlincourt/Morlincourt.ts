import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise"
import { City } from "../../../../../../country"

export const morlincourt = City.create(String(OiseCityCode.Morlincourt), oise, Place.fromDMS("49°34′14″N,3°02′14″E"))
