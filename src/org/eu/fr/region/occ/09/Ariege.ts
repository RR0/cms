import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const ariege = Department.create(FranceDepartementCode.Ariege, occitanie, Place.fromDMS(`43°00′N,1°30′E`))
