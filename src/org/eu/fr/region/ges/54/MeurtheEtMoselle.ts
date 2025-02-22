import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const meurtheEtMoselle = Department.create(FranceDepartementCode.MeurtheEtMoselle, grandEst,
  Place.fromDMS(`48°40′N,6°10′E`))
