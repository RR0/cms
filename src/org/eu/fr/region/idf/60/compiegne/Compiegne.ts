import { Place } from "@rr0/place"
import { OiseCityCode } from "../OiseCityCode.js"
import { oise } from "../Oise.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const compiegne = City.create(String(OiseCityCode.Compiegne), oise, Place.fromDMS("49°24′54″N,2°49′23″E"))
