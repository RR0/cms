import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { bretagne } from "../Bretagne.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const cotesDArmor = franceDepartment(FranceDepartementCode.CotesDArmor, bretagne,
  Place.fromDMS("48°20′N,2°50′W"))
