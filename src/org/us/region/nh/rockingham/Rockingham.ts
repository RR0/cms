import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { newHampshire } from "../NewHampshire.js"
import { Department } from "../../../../country/region/department/Department.js"

export const rockingham = Department.create(UsaCountyCode.rockingham, newHampshire,
  Place.fromDMS(`42°59'24"N,71°05'24"W`))
