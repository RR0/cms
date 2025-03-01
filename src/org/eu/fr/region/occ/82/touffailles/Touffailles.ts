import { Place } from "@rr0/place"
import { TarnEtGaronneCityCode } from "../TarnEtGaronneCityCode.js"
import { tarnEtGaronne } from "../TarnEtGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const touffailles = City.create(String(TarnEtGaronneCityCode.Touffailles), tarnEtGaronne,
  Place.fromDMS("44°16′26″N,1°03′05″E"))
