import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const charente = Department.create(NouvelleAquitaineDepartmentCode.Charente,
  nouvelleAquitaine, Place.fromDMS("45° 50′N, 0° 20′E"))
