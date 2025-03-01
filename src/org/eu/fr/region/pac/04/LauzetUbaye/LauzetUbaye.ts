import { Place } from "@rr0/place"
import { AlpesDeHauteProvenceCityCode } from "../AlpesDeHauteProvenceCityCode.js"
import { alpesDeHauteProvence } from "../AlpesDeHauteProvence.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const lauzetUbaye = City.create(String(AlpesDeHauteProvenceCityCode.LauzetUbaye), alpesDeHauteProvence,
  Place.fromDMS("44°25′51″N,6°25′58″E"))
