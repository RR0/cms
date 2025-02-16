import { Place } from "@rr0/place"
import { CharenteMaritimeCityCode } from "../CharenteMaritimeCityCode.js"
import { City } from "../../../../../../country"
import { charenteMaritime } from "../CharenteMaritime"

export const saintJeanAngely = City.create(String(CharenteMaritimeCityCode.SaintJeanAngely), charenteMaritime,
  Place.fromDMS(`45°56′48″N,0°31′46″W`))
