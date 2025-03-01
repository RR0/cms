import { Place } from "@rr0/place"
import { GirondeCityCode } from "../GirondeCityCode.js"
import { gironde } from "../Gironde.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const etauliers = City.create(String(GirondeCityCode.Etauliers), gironde, Place.fromDMS("45°13′29″N,0°34′21″O"))
