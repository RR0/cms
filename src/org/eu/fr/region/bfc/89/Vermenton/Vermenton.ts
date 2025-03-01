import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const vermenton89 = City.create(String(YonneCityCode.Vermenton), yonne, Place.fromDMS("47° 39′ 57″N,3°44′10″E"))
