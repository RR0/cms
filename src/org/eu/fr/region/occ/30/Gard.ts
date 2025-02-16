import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const gard = Department.create(FranceDepartementCode.Gard, occitanie, Place.fromDMS(`43°59′N,4°08′E`))
