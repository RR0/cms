import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const aude = Department.create(FranceDepartementCode.Aude, occitanie, Place.fromDMS(`43°05′N,2°25′E`))
