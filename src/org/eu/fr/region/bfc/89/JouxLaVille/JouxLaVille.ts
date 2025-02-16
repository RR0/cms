import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne"
import { City } from "../../../../../../country"

export const jouxLaVille = City.create(String(YonneCityCode.JouxLaVille), yonne,
  Place.fromDMS("47° 37′ 24″N,3°51′47″E"))
