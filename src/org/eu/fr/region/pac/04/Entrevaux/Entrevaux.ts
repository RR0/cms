import { Place } from "@rr0/place"
import { AlpesDeHauteProvenceCityCode } from "../AlpesDeHauteProvenceCityCode.js"
import { alpesDeHauteProvence } from "../AlpesDeHauteProvence"
import { City } from "../../../../../../country"

export const entrevaux = City.create(String(AlpesDeHauteProvenceCityCode.Entrevaux), alpesDeHauteProvence,
  Place.fromDMS("44°25′51″N,6°25′58″E"))
