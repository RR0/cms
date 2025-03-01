import { Place } from "@rr0/place"
import { CantalCityCode } from "../CantalCityCode.js"
import { cantal } from "../Cantal.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const pierrefort = City.create(String(CantalCityCode.Pierrefort), cantal, Place.fromDMS("44°55′21″N,2°50′19″E"))
