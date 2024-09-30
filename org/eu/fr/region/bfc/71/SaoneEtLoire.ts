import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const saoneEtLoire = Department.create(FranceDepartementCode.SaoneEtLoire, bourgogneFrancheComte,
  Place.fromDMS("46°40′N,4°42′E"))
