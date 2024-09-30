import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const paris = Department.create(FranceDepartementCode.Paris, ileDeFrance, Place.fromDMS("48°51′24″N,2°21′07″E"))
