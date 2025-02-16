import { Place } from "@rr0/place"
import { CharenteMaritimeCityCode } from "../CharenteMaritimeCityCode.js"
import { City } from "../../../../../../country"
import { charenteMaritime } from "../CharenteMaritime"

export const stMartinDeRe17 = City.create(String(CharenteMaritimeCityCode.StMartinDeRe), charenteMaritime,
  Place.fromDMS(`46°12′11″N,1°22′02″O`))
