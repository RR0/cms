import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "@rr0/place"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const deuxSevres = Department.create(NouvelleAquitaineDepartmentCode.PyreneesAtlantiques,
  nouvelleAquitaine, Place.fromDMS("46°30′N,00°20′E"))
