import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { wisconsin } from "../Wisconsin.js"
import { Department } from "../../../../country/region/department/Department.js"

export const dane = Department.create(UsaCountyCode.dane, wisconsin, Place.fromDMS("43°04′N 89°25′W"))
