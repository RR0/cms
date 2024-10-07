import { NormandieDepartmentCode } from "../NormandieDepartmentCode"
import { normandie } from "../Normandie"
import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"

export const calvados = Department.create(NormandieDepartmentCode.Calvados, normandie,
  Place.fromLocation(49.033333, 0.25))
