import { Place } from "@rr0/place"
import { YvelinesCityCode } from "../YvelinesCityCode.js"
import { yvelines } from "../Yvelines.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const neauphleLeChateau = City.create(String(YvelinesCityCode.NeauphleLeChateau), yvelines,
  Place.fromDMS("48°51′24″N,2°21′07″E"))
