import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { indiana } from "../Indiana.js"
import { Department } from "../../../../country/region/department/Department.js"

export const elkhartCounty = Department.create(UsaCountyCode.elkhart, indiana, Place.fromDMS("41°36′N,85°52′W"))
