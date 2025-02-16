import { Place } from "@rr0/place"
import { CharenteCityCode } from "../CharenteCityCode.js"
import { charente } from "../Charente"
import { City } from "../../../../../../country"

export const angouleme16 = City.create(String(CharenteCityCode.Angouleme), charente,
  Place.fromDMS("45°38′56″N,0°09′39″E"))
