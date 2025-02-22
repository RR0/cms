import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const seineEtMarne = Department.create(FranceDepartementCode.SeineEtMarne, ileDeFrance,
  Place.fromDMS("48°36′N,3°00′E"))
