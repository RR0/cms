import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "@rr0/place"
import { texas } from "../Texas.js"
import { Department } from "../../../../country/region/department/Department.js"

export const tarrant = Department.create(UsaCountyCode.tarrant, texas, Place.fromDMS("32°46′N 97°17′W"))
