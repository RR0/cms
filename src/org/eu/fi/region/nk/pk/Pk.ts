import { Department } from "../../../../../country/region/department/Department.js"
import { FinlandDepartementCode } from "../../FinlandDepartementCode.js"
import { northKarelia } from "../NorthKarelia.js"
import { Place } from "@rr0/place"

export const pk = Department.create(FinlandDepartementCode.pk, northKarelia,
  Place.fromDMS("63° 27′ 24″ N, 29° 40′ 05″ E"))
