import { Place } from "@rr0/place"
import { CharenteCityCode } from "../CharenteCityCode.js"
import { charente } from "../Charente"
import { City } from "../../../../../../country"

export const villeboisLavalette16 = City.create(String(CharenteCityCode.VilleboisLavalette), charente,
  Place.fromDMS("45°29′01″N,0°16′50″E"))
