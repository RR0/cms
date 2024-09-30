import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { indiana } from "../Indiana"
import { Department } from "../../../../country/region/department/Department"

export const monroe = Department.create(UsaCountyCode.monroe, indiana, Place.fromDMS("39°10′N,86°31′O"))
