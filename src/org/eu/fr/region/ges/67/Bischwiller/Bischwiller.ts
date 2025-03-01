import { Place } from "@rr0/place"
import { BasRhinCityCode } from "../BasRhinCityCode.js"
import { basRhin } from "../BasRhin.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const bischwiller = City.create(String(BasRhinCityCode.Bischwiller), basRhin,
  Place.fromDMS("48° 46′ 04″ N, 7° 51′ 36″E"))
