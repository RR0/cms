import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const creuse = Department.create(NouvelleAquitaineDepartmentCode.Creuse,
  nouvelleAquitaine, Place.fromLocation(46.189722, 2.085556))
