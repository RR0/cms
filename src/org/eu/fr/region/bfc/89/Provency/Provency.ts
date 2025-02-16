import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne"
import { City } from "../../../../../../country"

export const provency = City.create(String(YonneCityCode.Provency), yonne, Place.fromDMS("47° 32′ 50″N, 3° 57′ 23″E"))
