import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const hautesPyrenees = Department.create(FranceDepartementCode.HautesPyrenees, occitanie,
  Place.fromDMS(`43° 12′ N, 0° 08′E`))
