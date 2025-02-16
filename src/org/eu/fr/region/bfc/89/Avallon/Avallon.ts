import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne"
import { City } from "../../../../../../country"

export const avallon = City.create(String(YonneCityCode.Avallon), yonne, Place.fromDMS("47° 29′ 27″ N, 3° 54′ 33″E"))
