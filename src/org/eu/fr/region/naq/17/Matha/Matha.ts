import { Place } from "@rr0/place"
import { CharenteMaritimeCityCode } from "../CharenteMaritimeCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { charenteMaritime } from "../CharenteMaritime.js"

export const matha = City.create(String(CharenteMaritimeCityCode.Matha), charenteMaritime,
  Place.fromDMS(`45° 52′ 06″ N, 0° 19′ 08″W`))
