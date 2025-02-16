import { Place } from "@rr0/place"
import { britishColumbia } from "../BritishColumbia.js"
import { Department } from "../../../../country/region/department/Department.js"
import { BritishColumbiaDepartmentCode } from "../BritishColumbiaDepartmentCode.js"

export const kootenays = Department.create(BritishColumbiaDepartmentCode.kootenays, britishColumbia,
  Place.fromDMS("50°30′N,116°30′W"))
