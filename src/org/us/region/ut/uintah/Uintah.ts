import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { utah } from "../Utah.js"
import { Department } from "../../../../country/region/department/Department.js"

export const uintah = Department.create(UsaCountyCode.uintah, utah, Place.fromDMS("40°08′N,109°31′W"))
