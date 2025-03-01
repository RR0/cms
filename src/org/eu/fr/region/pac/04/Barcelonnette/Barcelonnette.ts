import { Place } from "@rr0/place"
import { AlpesDeHauteProvenceCityCode } from "../AlpesDeHauteProvenceCityCode.js"
import { alpesDeHauteProvence } from "../AlpesDeHauteProvence.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const barcelonnette = City.create(String(AlpesDeHauteProvenceCityCode.Barcelonnette), alpesDeHauteProvence,
  Place.fromDMS("44°23′12″N,6°39′11″E"))
