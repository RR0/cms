import { NormandieDepartmentCode } from "../NormandieDepartmentCode.js"
import { normandie } from "../Normandie.js"
import { Place } from "@rr0/place"
import { Department } from "../../../../../country/region/department/Department.js"

export const seineMaritime = Department.create(NormandieDepartmentCode.SeineMaritime, normandie,
  Place.fromDMS("49°40′N,0°50′E"))
