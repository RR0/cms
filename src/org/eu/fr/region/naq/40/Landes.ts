import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const landes = Department.create(NouvelleAquitaineDepartmentCode.Landes,
  nouvelleAquitaine, Place.fromDMS("44°00′N,0°50′O"))
