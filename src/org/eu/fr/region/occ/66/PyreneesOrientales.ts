import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const pyreneesOrientales = Department.create(FranceDepartementCode.PyreneesOrientales, occitanie,
  Place.fromDMS(`42°38′N,2°40′E`))
