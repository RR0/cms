import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise"
import { City } from "../../../../../../country"

export const ribecourtDreslincourt = City.create(String(OiseCityCode.RibecourtDreslincourt), oise,
  Place.fromDMS("49°30′39″N,2°55′24″E"))
