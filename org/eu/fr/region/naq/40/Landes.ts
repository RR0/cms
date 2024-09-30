import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const landes = Department.create(NouvelleAquitaineDepartmentCode.Landes,
  nouvelleAquitaine, Place.fromDMS("44°00′N,0°50′O"))
