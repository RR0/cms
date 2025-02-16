import { Place } from "@rr0/place"
import { IsereCityCode } from "../IsereCityCode.js"
import { isere } from "../Isere"
import { City } from "../../../../../../country"

export const saintVerand = City.create(String(IsereCityCode.SaintVerand), isere,
  Place.fromDMS("45° 10′ 26″ N, 5° 19′ 57″E"))
