import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { indiana } from "../Indiana.js"
import { Department } from "../../../../country/region/department/Department.js"

export const monroe = Department.create(UsaCountyCode.monroe, indiana, Place.fromDMS("39°10′N,86°31′O"))
