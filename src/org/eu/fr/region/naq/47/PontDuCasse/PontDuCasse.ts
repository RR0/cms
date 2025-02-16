import { Place } from "@rr0/place"
import { LotEtGaronneCityCode } from "../LotEtGaronneCityCode.js"
import { lotEtGaronne } from "../LotEtGaronne"
import { City } from "../../../../../../country"

export const pontDuCasse = City.create(String(LotEtGaronneCityCode.PontDuCasse), lotEtGaronne,
  Place.fromDMS("44° 13′ 57″ N, 0° 40′ 55″E"))
