import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const vosges = Department.create(FranceDepartementCode.Vosges, grandEst, Place.fromDMS(`48° 10′N, 6° 25′E`))
