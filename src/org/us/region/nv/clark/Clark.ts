import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { nevada } from "../Nevada.js"
import { Department } from "../../../../country/region/department/Department.js"

export const clark = Department.create(UsaCountyCode.clark, nevada, Place.fromDMS("36°21′N,115°05′W"))
