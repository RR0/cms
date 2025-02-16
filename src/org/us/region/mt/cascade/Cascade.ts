import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { montana } from "../Montana.js"
import { Department } from "../../../../country/region/department/Department.js"

export const cascade = Department.create(UsaCountyCode.cascade, montana, Place.fromDMS("47°31'N,111°35'W"))
