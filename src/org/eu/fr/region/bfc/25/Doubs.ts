import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const doubs = Department.create(FranceDepartementCode.Doubs, bourgogneFrancheComte,
  Place.fromDMS("47° 10′ N, 6° 25′E"))
