import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const valDOise = Department.create(FranceDepartementCode.ValDOise, ileDeFrance, Place.fromDMS("49°04′N,2°14′E"))
