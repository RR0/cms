import { Place } from "@rr0/place"
import { NorthChinaDepartementCode } from "../NorthChinaDepartmentCode.js"
import { Department } from "../../../../country/region/department/Department.js"
import { northChina } from "../NorthChina.js"

export const hebei = Department.create(NorthChinaDepartementCode.ji, northChina,
  Place.fromDMS("38°02′32″N,114°30′31″E"))
