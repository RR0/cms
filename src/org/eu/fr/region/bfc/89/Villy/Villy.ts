import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const villy89 = City.create(String(YonneCityCode.Villy), yonne, Place.fromDMS("47°52′07″N,3°45′06″E"))
