import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const hauteGaronne = Department.create(FranceDepartementCode.HauteGaronne, occitanie,
  Place.fromDMS(`43°26′N,1°08′E`))
