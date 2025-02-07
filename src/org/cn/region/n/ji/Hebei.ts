import { Place } from "../../../../../place/Place.js"
import { NorthChinaDepartementCode } from "../NorthChinaDepartmentCode"
import { Department } from "../../../../country"
import { northChina } from "../NorthChina"

export const hebei = Department.create(NorthChinaDepartementCode.ji, northChina,
  Place.fromDMS("38°02′32″N,114°30′31″E"))
