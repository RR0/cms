import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const cantal = Department.create(FranceDepartementCode.Cantal, auvergneRhoneAlpes,
  Place.fromDMS("45°02′00″N,3°06′00″E"))
