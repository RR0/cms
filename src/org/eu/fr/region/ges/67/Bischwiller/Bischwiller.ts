import { Place } from "@rr0/place"
import { BasRhinCityCode } from "../BasRhinCityCode.js"
import { basRhin } from "../BasRhin"
import { City } from "../../../../../../country"

export const bischwiller = City.create(String(BasRhinCityCode.Bischwiller), basRhin,
  Place.fromDMS("48° 46′ 04″ N, 7° 51′ 36″E"))
