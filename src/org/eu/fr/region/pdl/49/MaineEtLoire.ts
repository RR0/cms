import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { paysDeLoire } from "../PaysDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const maineEtLoire = franceDepartment(FranceDepartementCode.MaineEtLoire, paysDeLoire,
  Place.fromDMS("47°27′N,0°36′O"))
