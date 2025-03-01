import { Place } from "@rr0/place"
import { YvelinesCityCode } from "../YvelinesCityCode.js"
import { yvelines } from "../Yvelines.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const mesnilLeRoi = City.create(String(YvelinesCityCode.MesnilLeRoi), yvelines,
  Place.fromDMS("48°56′15″N,2°07′39″E"))
