import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const lotEtGaronne = Department.create(NouvelleAquitaineDepartmentCode.LotEtGaronne,
  nouvelleAquitaine, Place.fromDMS("44°00′N,0°50′O"))
