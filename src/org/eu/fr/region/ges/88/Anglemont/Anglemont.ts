import { Place } from "@rr0/place"
import { VosgesCityCode } from "../VosgesCityCode.js"
import { vosges } from "../Vosges.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const anglemont = City.create(String(VosgesCityCode.Anglemont), vosges,
  Place.fromDMS("48° 22′ 51″ N, 6° 40′ 10″E"))
