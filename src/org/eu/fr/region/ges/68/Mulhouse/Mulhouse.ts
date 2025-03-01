import { Place } from "@rr0/place"
import { HautRhinCityCode } from "../HautRhinCityCode.js"
import { hautRhin } from "../HautRhin.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const mulhouse = City.create(String(HautRhinCityCode.Mulhouse), hautRhin,
  Place.fromDMS("47° 44′ 58″ N, 7° 20′ 24″E"))
