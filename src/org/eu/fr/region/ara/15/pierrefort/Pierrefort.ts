import { Place } from "@rr0/place"
import { CantalCityCode } from "../CantalCityCode.js"
import { cantal } from "../Cantal"
import { City } from "../../../../../../country"

export const pierrefort = City.create(String(CantalCityCode.Pierrefort), cantal, Place.fromDMS("44°55′21″N,2°50′19″E"))
