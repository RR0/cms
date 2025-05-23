import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const saoneEtLoire = Department.create(FranceDepartementCode.SaoneEtLoire, bourgogneFrancheComte,
  Place.fromDMS("46°40′N,4°42′E"))
