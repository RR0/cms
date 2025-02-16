import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { minnesota } from "../Minnesota.js"
import { Department } from "../../../../country/region/department/Department.js"

export const hennepin = Department.create(UsaCountyCode.hennepin, minnesota, Place.fromDMS("45°02′N,93°29′W"))
