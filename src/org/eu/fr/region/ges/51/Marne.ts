import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const marne = Department.create(FranceDepartementCode.Marne, grandEst, Place.fromDMS(`49°00′N,4°15′E`))
