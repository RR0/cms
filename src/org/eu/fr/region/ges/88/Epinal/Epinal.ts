import { Place } from "@rr0/place"
import { VosgesCityCode } from "../VosgesCityCode.js"
import { vosges } from "../Vosges.js"
import { City } from "../../../../../../country/region/department/city/City.js"

export const epinal = City.create(String(VosgesCityCode.Epinal), vosges, Place.fromDMS("48° 10′ 28″ N, 6° 27′ 04″E"))
