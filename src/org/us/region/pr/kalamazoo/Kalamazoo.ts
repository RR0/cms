import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { puertoRico } from "../PuertoRico.js"
import { Department } from "../../../../country/region/department/Department.js"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, puertoRico, Place.fromDMS("42°14′N,85°32′W"))
