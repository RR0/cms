import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const precyLeSec = City.create(String(YonneCityCode.PrecyLeSec), yonne, Place.fromDMS("47°52′07″N,3°45′06″E"))
