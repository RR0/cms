import { Place } from "@rr0/place"
import { ArdecheCityCode } from "../ArdecheCityCode.js"
import { ardeche } from "../Ardeche.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const vernouxEnVivarais = City.create(String(ArdecheCityCode.VernouxEnVivarais), ardeche,
  Place.fromDMS("44°53′47″N,4°38′46″E"))
