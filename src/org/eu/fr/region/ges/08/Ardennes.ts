import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const ardennes = Department.create(FranceDepartementCode.Ardennes, grandEst, Place.fromDMS(`49° 35′ N, 4° 40′E`))
