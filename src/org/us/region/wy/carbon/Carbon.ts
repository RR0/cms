import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { wyoming } from "../Wyoming.js"
import { Department } from "../../../../country/region/department/Department.js"

export const carbon = Department.create(UsaCountyCode.carbon, wyoming, Place.fromDMS("41°41′N 106°56′W"))
