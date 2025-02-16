import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { mississippi } from "../Mississippi.js"
import { Department } from "../../../../country/region/department/Department.js"

export const hinds = Department.create(UsaCountyCode.hinds, mississippi, Place.fromDMS("32°26'N,90°44'W"))
