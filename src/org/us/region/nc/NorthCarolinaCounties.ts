import { Place } from "@rr0/place"
import { Department } from "../../../country/region/department/Department.js"
import { NorthCarolinaCountyCode } from "./NorthCarolinaCountyCode.js"
import { northCarolina } from "./NorthCarolina.js"

export const northCarolinaCounties: Department[] = [
  Department.create(NorthCarolinaCountyCode.guilford, northCarolina, Place.fromDMS("35°30′N,80°00′W"))
]
