import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { paysDeLoire } from "../PaysDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const loireAtlantique = franceDepartment(FranceDepartementCode.LoireAtlantique, paysDeLoire,
  Place.fromDMS("47°20′N,1°40′O"))
