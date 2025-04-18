import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const yonne = Department.create(FranceDepartementCode.Yonne, bourgogneFrancheComte,
  Place.fromDMS("47° 50′N, 3° 30′E"))
