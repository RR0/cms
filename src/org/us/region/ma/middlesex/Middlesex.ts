import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { massachusetts } from "../Massachusetts.js"
import { Department } from "../../../../country/region/department/Department.js"

export const middlesex = Department.create(UsaCountyCode.middlesex, massachusetts, Place.fromDMS("42°29′N,71°23′W"))
