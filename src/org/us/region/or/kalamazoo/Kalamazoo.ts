import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { oregon } from "../Oregon.js"
import { Department } from "../../../../country/region/department/Department.js"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, oregon, Place.fromDMS("42°14′N,85°32′W"))
