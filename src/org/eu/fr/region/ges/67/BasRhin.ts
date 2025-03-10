import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const basRhin = Department.create(FranceDepartementCode.BasRhin, grandEst, Place.fromDMS(`48°40′N,7°35′E`))
