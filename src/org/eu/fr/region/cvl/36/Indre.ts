import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { centreValDeLoire } from "../CentreValDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const indre = franceDepartment(FranceDepartementCode.Indre, centreValDeLoire, Place.fromDMS("46°46′N,1°36′E"))
