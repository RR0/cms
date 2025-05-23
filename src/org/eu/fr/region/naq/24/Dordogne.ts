import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const dordogne = Department.create(NouvelleAquitaineDepartmentCode.Dordogne,
  nouvelleAquitaine, Place.fromDMS("45° 00′ N, 0° 40′ E"))
