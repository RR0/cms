import { Department } from "../../../country/region/department/Department.js"
import { FranceDepartementCode } from "./FranceDepartementCode.js"
import { Place } from "@rr0/place"
import { Region } from "../../../country/region/Region.js"

// SPLIT OUT of FranceDepartments, which aggregates every departement in the country. Each departement
// calls this to build itself, so reaching it through the aggregate meant a leaf importing the list it
// is a member of — a cycle, and the reason `sarthe` could be read before it was initialised.

export function franceDepartment(code: FranceDepartementCode, region: Region, place: Place) {
  return Department.create(code, region, place)
}