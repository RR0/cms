import { Place } from "@rr0/place"
import { CharenteMaritimeCityCode } from "../CharenteMaritimeCityCode.js"
import { City } from "../../../../../../country/region/department/city/City.js"
import { charenteMaritime } from "../CharenteMaritime.js"

export const saujon = City.create(String(CharenteMaritimeCityCode.Saujon), charenteMaritime,
  Place.fromDMS(`45° 40′ 17″N,0°55′40″W`))
