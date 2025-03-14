import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { centreValDeLoire } from "../CentreValDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const loiret = franceDepartment(FranceDepartementCode.Loiret, centreValDeLoire, Place.fromDMS("47°55′N,2°10′E"))
