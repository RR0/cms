import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const ain = Department.create(FranceDepartementCode.Ain, auvergneRhoneAlpes,
  Place.fromDMS("46°05′00″N,5°20′00″E"))
