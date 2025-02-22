import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const puyDeDome = Department.create(FranceDepartementCode.PuyDeDome,
  auvergneRhoneAlpes, Place.fromDMS("45°42′N,3°13′E"))
