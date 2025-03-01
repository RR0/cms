import { Place } from "@rr0/place"
import { GirondeCityCode } from "../GirondeCityCode.js"
import { gironde } from "../Gironde.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const cestas = City.create(String(GirondeCityCode.Cestas), gironde, Place.fromDMS("44°44′43″N,0°40′52″W"))
