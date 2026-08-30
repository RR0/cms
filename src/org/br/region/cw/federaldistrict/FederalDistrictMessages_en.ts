import { FederalDistrictCityCode } from "./FederalDistrictCityCode.js"
import { brasiliaMessages_en } from "./70000-000/BrasiliaMessages_en.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const federalDistrictMessages_en = DepartmentMessages.create("Federal District", {
  [FederalDistrictCityCode.Brasilia]: brasiliaMessages_en
})
