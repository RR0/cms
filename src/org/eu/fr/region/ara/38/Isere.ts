import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const isere = Department.create(FranceDepartementCode.Isere, auvergneRhoneAlpes, Place.fromDMS("45°20′N,5°30′E"))
