import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const creuse = Department.create(NouvelleAquitaineDepartmentCode.Creuse,
  nouvelleAquitaine, Place.fromLocation(46.189722, 2.085556))
