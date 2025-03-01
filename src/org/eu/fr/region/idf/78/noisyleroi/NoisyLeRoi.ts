import { Place } from "@rr0/place"
import { YvelinesCityCode } from "../YvelinesCityCode.js"
import { yvelines } from "../Yvelines.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const noisyLeRoi = City.create(String(YvelinesCityCode.NoisyLeRoi), yvelines,
  Place.fromDMS("48°50′49″N,2°03′39″E"))
