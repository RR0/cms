import { Place } from "@rr0/place"
import { PyreneesOrientalesCityCode } from "../PyreneesOrientalesCityCode.js"
import { pyreneesOrientales } from "../PyreneesOrientales.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const planes = City.create(String(PyreneesOrientalesCityCode.Planes), pyreneesOrientales,
  Place.fromDMS("42° 29′ 35″ N, 2° 08′ 25″E"))
