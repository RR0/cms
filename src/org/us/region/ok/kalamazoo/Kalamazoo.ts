import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { oklahoma } from "../Oklahoma.js"
import { Department } from "../../../../country/region/department/Department.js"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, oklahoma, Place.fromDMS("42°14′N,85°32′W"))
