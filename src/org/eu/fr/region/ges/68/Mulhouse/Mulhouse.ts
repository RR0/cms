import { Place } from "@rr0/place"
import { HautRhinCityCode } from "../HautRhinCityCode.js"
import { hautRhin } from "../HautRhin"
import { City } from "../../../../../../country"

export const mulhouse = City.create(String(HautRhinCityCode.Mulhouse), hautRhin,
  Place.fromDMS("47° 44′ 58″ N, 7° 20′ 24″E"))
