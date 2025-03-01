import { Place } from "@rr0/place"
import { LotEtGaronneCityCode } from "../LotEtGaronneCityCode.js"
import { lotEtGaronne } from "../LotEtGaronne.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const pontDuCasse = City.create(String(LotEtGaronneCityCode.PontDuCasse), lotEtGaronne,
  Place.fromDMS("44° 13′ 57″ N, 0° 40′ 55″E"))
