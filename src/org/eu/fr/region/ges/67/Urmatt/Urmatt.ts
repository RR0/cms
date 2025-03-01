import { Place } from "@rr0/place"
import { BasRhinCityCode } from "../BasRhinCityCode.js"
import { basRhin } from "../BasRhin.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const urmatt = City.create(String(BasRhinCityCode.Urmatt), basRhin, Place.fromDMS("48°31′40″N,7°19′32″E"))
