import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const yvelines = Department.create(FranceDepartementCode.Yvelines, ileDeFrance, Place.fromDMS(`48°50′N,1°55′E`))
