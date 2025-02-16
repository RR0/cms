import { Place } from "@rr0/place"
import { YonneCityCode } from "../YonneCityCode.js"
import { yonne } from "../Yonne"
import { City } from "../../../../../../country"

export const flognyLaChapelle = City.create(String(YonneCityCode.FlognyLaChapelle), yonne,
  Place.fromDMS("47°57′11″N,3°52′23″E"))
