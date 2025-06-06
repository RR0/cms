import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const ardeche = Department.create(FranceDepartementCode.Ardeche, auvergneRhoneAlpes,
  Place.fromDMS("44°40′N,4°25′E"))
