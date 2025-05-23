import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode.js"
import { Place } from "@rr0/place"
import { hautsDeFrance } from "../HautsDeFrance.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const pasDeCalais = Department.create(HautsDeFranceDepartmentCode.PasDeCalais, hautsDeFrance,
  Place.fromDMS("50°23′N,3°19′E"))
