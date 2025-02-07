import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { missouri } from "../Missouri.js"
import { Department } from "../../../../country/region/department/Department.js"

export const pike = Department.create(UsaCountyCode.pike, missouri, Place.fromDMS("39°34'N,91°17'W"))
