import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const correze = Department.create(NouvelleAquitaineDepartmentCode.Correze,
  nouvelleAquitaine, Place.fromDMS("45°20′N,1°50′E"))
