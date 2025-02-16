import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise"
import { City } from "../../../../../../country"

export const compiegne = City.create(String(OiseCityCode.Compiegne), oise, Place.fromDMS("49°24′54″N,2°49′23″E"))
