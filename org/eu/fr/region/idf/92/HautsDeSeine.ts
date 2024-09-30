import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const hautsDeSeine = Department.create(FranceDepartementCode.HautsDeSeine, ileDeFrance,
  Place.fromLocation(48.83333, 2.2))
