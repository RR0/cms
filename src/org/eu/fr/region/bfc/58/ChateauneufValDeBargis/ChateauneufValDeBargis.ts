import { Place } from "@rr0/place"
import { NievreCityCode } from "../NievreCityCode.js"
import { nievre } from "../Nievre"
import { City } from "../../../../../../country"

export const chateauneufValDeBargis = City.create(String(NievreCityCode.ChateauneufValDeBargis), nievre,
  Place.fromDMS(`47°17′03″N,3°13′38″E`))
