import { NormandieDepartmentCode } from "../NormandieDepartmentCode.js"
import { normandie } from "../Normandie.js"
import { Place } from "@rr0/place"
import { Department } from "../../../../../country/region/department/Department.js"

export const calvados = Department.create(NormandieDepartmentCode.Calvados, normandie,
  Place.fromLocation(49.033333, 0.25))
